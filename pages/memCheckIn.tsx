import { RootState } from "@/store/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { X, Info, Clock } from "lucide-react";
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

  return (
    (!userInfo.hasPaid ? 
    ( <div className="w-full max-w-md mx-auto bg-gradient-to-b from-[#acc2ff] via-[#b7c7ff] to-[#c6d2ff] rounded-3xl overflow-hidden shadow-2xl">

      {/* Header */}
      <div className="bg-[#ef4444] px-6 py-4 flex items-center justify-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center">
          <X className="w-4 h-4 text-white" />
        </div>
        <span className="text-white text-xl font-semibold">Not a Member</span>
      </div>

      {/* Main Card Content */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 px-6 py-8 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full border-8 border-white transform translate-x-32 translate-y-32"></div>
        </div>

        <div className="relative z-10">
          {/* Profile and Title */}
          <div className="flex items-start gap-4 mb-8">
            <div className="w-16 h-16 bg-[#959595] rounded-full"></div>
            <div>
              <h2 className="text-white text-3xl font-bold mb-1">UW Data Science Club</h2>
              <p className="text-blue-200 text-lg">Term Membership Card</p>
            </div>
          </div>

          {/* Member Info Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8">
            <p className="text-blue-200 text-sm mb-2">Member</p>
            <h3 className="text-white text-2xl font-semibold">Jia Huang</h3>
          </div>

          {/* Info Message */}
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 flex items-start gap-3">
            <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0">
              <Info className="w-3 h-3 text-white" />
            </div>
            <p className="text-white text-sm leading-relaxed">
              You have made your account, but have not paid your $4 fee. View instructions
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-gradient-to-r from-purple-900 to-blue-900 px-6 py-6 flex items-center justify-between">
        <div>
            <p className="text-[#b7b7b7] text-sm mb-1">Event Check-in</p>
            <h3 className="text-white text-xl font-semibold leading-tight">Upper Year Co-op Panel</h3>
          </div>
        <button className="w-12 h-12 bg-[#ef4444] rounded-xl flex items-center justify-center">
          <X className="w-6 h-6 text-white" />
        </button>
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
            <h1 className="text-white text-3xl font-bold">UW Data Science Club</h1>
            <p className="text-[#b7b7b7] text-lg">Term Membership Card</p>
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
  )));
}
