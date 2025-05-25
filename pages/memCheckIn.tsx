import { RootState } from "@/store/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Clock } from "lucide-react";
import {
  getCurrentUser,
  getEvents,
  getCurrentUserRegistrationByID,
  patchCurrentUserRegistrationByID,
} from "@/utils/apiCalls";

interface UserInfo {
  username: string;
  email: string;
  faculty: string;
  hasPaid: boolean;
  isCheckedIn: boolean;
}

export default function MemCheckIn() {
  // retrieve id from token - theres library (npm i jwt-decode to decode jwt token for id)
  // that does this but this is manual way
  const userToken = useSelector((state: RootState) => state.loginToken.token);
  const userId = JSON.parse(atob(userToken.split(".")[1])).user.id;

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [checkedIn, setCheckedIn] = useState(false);

  // fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!userToken) {
          throw new Error("User is not registered.");
        }
        const response = await getCurrentUser();
        setUserInfo(response.data.user);
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userToken]);

  // fetch current event
  useEffect(() => {
    const retrieveEvents = async () => {
      const response = await getEvents(
        new Date("2025-01-30"),
        new Date("2025-02-01"),
        true,
      );
      const events = response.data.events;
      console.log(selectedEvent);
      if (!selectedEvent) {
        setSelectedEvent(events && events.length == 1 ? events[0] : null);
      }
    };
    retrieveEvents();
  }, []);

  // fetch registrant from event
  // combine w above
  useEffect(() => {
    const getRegistrant = async () => {
      if (selectedEvent) {
        const response = await getCurrentUserRegistrationByID();
        setCheckedIn(response.data.checkedIn);
      }
    };
    getRegistrant();
  }, [selectedEvent]);

  const handleCheckIn = async () => {
    // setCheckedIn(true);
    // const response = await patchCurrentUserRegistrationByID({additionalFields: null});
    // if (response.data.success) {
    //   console.log(response.data);
    // }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userInfo) {
    return null;
  }

  return !userInfo.hasPaid ? (
    <div className="my-10 w-[30%] break-words rounded-xl border-2 border-white p-5 text-white">
      <h1 className="mb-5">Membership Card</h1>
      <div>
        <p>
          <span className="font-bold">Username: </span>
          {userInfo.username}
        </p>
        <p>
          <span className="font-bold">Email: </span>
          {userInfo.email}
        </p>
        <p>
          <span className="font-bold">Faculty: </span>
          {userInfo.faculty}
        </p>
        <p>
          <span className="font-bold">Paid: </span>
          {userInfo.hasPaid ? "Yes" : "No"}
        </p>
        <p>
          <span className="font-bold">Checked In: </span>
          {userInfo.isCheckedIn ? "Yes" : "No"}
        </p>
      </div>
    </div>
  ) : !userInfo.isCheckedIn ? (
    <div className="mx-auto w-full max-w-md overflow-hidden rounded-3xl bg-[#172f6a] shadow-2xl">
      {/* Status Header */}
      <div className="flex items-center justify-center gap-3 bg-[#f59e0c] px-6 py-4">
        <Clock className="h-6 w-6 text-white" />
        <span className="text-xl font-semibold text-white">Not Checked-In</span>
      </div>

      {/* Main Card Content */}
      <div className="px-6 py-8">
        {/* Header with Avatar and Title */}
        <div className="mb-8 flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-[#959595]"></div>
          <div>
            <h1 className="text-3xl font-bold text-white">UW Data Science</h1>
            <p className="text-lg text-[#b7b7b7]">Term Membership Card</p>
          </div>
        </div>

        {/* Member Information Card */}
        <div className="mb-8 rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
          <p className="mb-2 text-sm text-[#b7b7b7]">Member</p>
          <h2 className="mb-6 text-2xl font-bold text-white">Jia Huang</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="mb-1 text-sm text-[#b7b7b7]">Current Time</p>
              <p className="text-xl font-bold text-white">XX:XX:XX</p>
            </div>
            <div>
              <p className="mb-1 text-sm text-[#b7b7b7]">MathSoc Member</p>
              <p className="text-xl font-bold text-white">Yes</p>
            </div>
          </div>
        </div>

        {/* Event Information and Check-in */}
        <div className="flex items-end justify-between">
          <div>
            <p className="mb-1 text-sm text-[#b7b7b7]">Event Check-in</p>
            <h3 className="text-xl font-semibold leading-tight text-white">
              Upper Year Co-op Panel
            </h3>
          </div>
          <button 
            className="rounded-xl bg-[#f59e0c] px-5 py-3 text-lg font-semibold text-white shadow-lg hover:bg-[#e8890b]"
            onClick={handleCheckIn}>
            Check-In
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="my-10 w-[30%] break-words rounded-xl border-2 border-white p-5 text-white">
      <h1 className="mb-5">Membership Card</h1>
      <div>
        <p>
          <span className="font-bold">Username: </span>
          {userInfo.username}
        </p>
        <p>
          <span className="font-bold">Email: </span>
          {userInfo.email}
        </p>
        <p>
          <span className="font-bold">Faculty: </span>
          {userInfo.faculty}
        </p>
        <p>
          <span className="font-bold">Paid: </span>
          {userInfo.hasPaid ? "Yes" : "No"}
        </p>
        <p>
          <span className="font-bold">Checked In: </span>
          {userInfo.isCheckedIn ? "Yes" : "No"}
        </p>
      </div>
    </div>
  );
}
