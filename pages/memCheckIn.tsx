import { RootState } from "@/store/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { X, Check, Info, Clock, CircleCheck, CircleX } from "lucide-react";
import {
  getCurrentUser,
  getEvents,
  getCurrentUserRegistrationByID,
  patchCurrentUserRegistrationByID,
  patchCheckInRegistrantById,
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
  const [time, setTime] = useState("");

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
      }
    };

    fetchUserData();
  }, []);

  // fetch current event
  useEffect(() => {
    const retrieveEvents = async () => {
      const response = await getEvents(
        new Date("2025-01-30"),
        new Date("2025-02-01"),
        true,
      );
      const events = response.data.events;
      console.log(events);
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
        try {
          const response = await getCurrentUserRegistrationByID();
          setCheckedIn(response.data.checkedIn);
        } catch (err) {
          console.error("Error fetching check-in status:", err);
        } finally {
          setLoading(false);
        }
      }
    };
    getRegistrant();
  }, [selectedEvent]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString("en-US", { hour12: false });
      setTime(formattedTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCheckIn = async () => {
    setCheckedIn(true);
    const response = await patchCheckInRegistrantById(selectedEvent.id, userId, "");
    if (response.data.success) {
      console.log(response.data);
    }
    else if (response.status === 500) {
      console.log("Hi")
    }
  }
  if (!userInfo){
    return null;
  }

  if (loading) {
    return null;
  }
  return !userInfo.hasPaid ? (
    <div className="mx-auto w-full max-w-md overflow-hidden rounded-3xl bg-gradient-to-b from-[#acc2ff] via-[#b7c7ff] to-[#c6d2ff] shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-center gap-3 bg-[#ef4444] px-6 py-4">
          <CircleX className="h-8 w-8 text-white stroke-[1.5]" />
        <span className="text-2xl font-semibold text-white">Not a Member</span>
      </div>

      {/* Main Card Content */}
      <div className="from-blue-600 via-blue-700 to-purple-800 relative overflow-hidden bg-gradient-to-br px-6 py-8">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-0 right-0 h-64 w-64 translate-x-32 translate-y-32 transform rounded-full border-8 border-white"></div>
        </div>

        <div className="relative z-10">
          {/* Profile and Title */}
          <div className="mb-8 flex items-start gap-4">
            <div className="h-16 w-16 rounded-full bg-[#959595]"></div>
            <div>
              <h2 className="mb-1 text-3xl font-bold text-white">
                UW Data Science Club
              </h2>
              <p className="text-blue-200 text-lg">Term Membership Card</p>
            </div>
          </div>

          {/* Member Info Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8">
            <p className="text-blue-200 text-sm mb-2">Member</p>
            <h3 className="text-white text-2xl font-semibold">{userInfo.username}</h3>
          </div>

          {/* Info Message */}
          <div className="bg-white/15 flex items-start gap-3 rounded-2xl p-4 backdrop-blur-sm">
            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-black">
              <Info className="h-3 w-3 text-white" />
            </div>
            <p className="text-sm leading-relaxed text-white">
              You have made your account, but have not paid your $4 fee. View
              instructions
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="from-purple-900 to-blue-900 flex items-center justify-between bg-gradient-to-r px-6 py-6">
        <div>
            <p className="text-[#b7b7b7] text-sm mb-1">Event Check-in</p>
            <h3 className="text-white text-xl font-semibold leading-tight">
              {selectedEvent ? <p>{selectedEvent.name}</p> : <p>No events running</p>}
            </h3>
          </div>
        <button className="w-12 h-12 bg-[#ef4444] rounded-xl flex items-center justify-center">
          <X className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  ) : (!checkedIn ? (
    <div className="mx-auto w-full max-w-md overflow-hidden rounded-3xl bg-[#172f6a] shadow-2xl">
      {/* Status Header */}
      <div className="flex items-center justify-center gap-3 bg-[#f59e0c] px-6 py-4">
        <Clock className="h-6 w-6 text-white" />
        <span className="text-2xl font-semibold text-white">Not Checked-In</span>
      </div>

      {/* Main Card Content */}
      <div className="px-6 py-8">
        {/* Header with Avatar and Title */}
        <div className="mb-8 flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-[#959595]"></div>
          <div>
            <h1 className="text-3xl font-bold text-white">
              UW Data Science Club
            </h1>
            <p className="text-lg text-[#b7b7b7]">Term Membership Card</p>
          </div>
        </div>

        {/* Member Information Card */}
        <div className="mb-8 rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
          <p className="mb-2 text-sm text-[#b7b7b7]">Member</p>
          <h2 className="mb-6 text-2xl font-bold text-white">{userInfo.username}</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="mb-1 text-sm text-[#b7b7b7]">Current Time</p>
              <p className="text-xl font-bold text-white">{time}</p>
            </div>
            <div>
              <p className="mb-1 text-sm text-[#b7b7b7]">MathSoc Member</p>
              <p className="text-xl font-bold text-white">{(userInfo.faculty === "Math") ? "Yes" : "No"}</p>
            </div>
          </div>
        </div>

        {/* Event Information and Check-in */}
        <div className="flex items-end justify-between">
          <div>
            <p className="mb-1 text-sm text-[#b7b7b7]">Event Check-in</p>
            <h3 className="text-xl font-semibold leading-tight text-white">
              {selectedEvent ? <p>{selectedEvent.name}</p> : <p>No events running</p>}
            </h3>
          </div>
          <button
            className="rounded-xl bg-[#f59e0c] px-5 py-3 text-lg font-semibold text-white shadow-lg hover:bg-[#e8890b]"
            onClick={handleCheckIn}
          >
            Check-In
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="mx-auto w-full max-w-md overflow-hidden rounded-3xl bg-gradient-to-b from-[#acc2ff] via-[#b7c7ff] to-[#c6d2ff] shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-center gap-3 bg-[#11b981] px-6 py-4">
        <CircleCheck className="h-8 w-8 text-white stroke-[1.5]" />
        <span className="text-2xl font-semibold text-white">Checked In</span>
      </div>

      {/* Main Card Content */}
      <div className="from-blue-600 via-blue-700 to-purple-800 relative overflow-hidden bg-gradient-to-br px-6 py-8">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-0 right-0 h-64 w-64 translate-x-32 translate-y-32 transform rounded-full border-8 border-white"></div>
        </div>

        <div className="relative z-10">
          {/* Profile and Title */}
          <div className="mb-8 flex items-start gap-4">
            <div className="h-16 w-16 rounded-full bg-[#959595]"></div>
            <div>
              <h2 className="mb-1 text-3xl font-bold text-white">
                UW Data Science Club
              </h2>
              <p className="text-blue-200 text-lg">Term Membership Card</p>
            </div>
          </div>

          {/* Member Info Card */}
          <div className="mb-8 rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
          <p className="mb-2 text-sm text-[#b7b7b7]">Member</p>
          <h2 className="mb-6 text-2xl font-bold text-white">{userInfo.username}</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="mb-1 text-sm text-[#b7b7b7]">Current Time</p>
              <p className="text-xl font-bold text-white">{time}</p>
            </div>
            <div>
              <p className="mb-1 text-sm text-[#b7b7b7]">MathSoc Member</p>
              <p className="text-xl font-bold text-white">{(userInfo.faculty === "Math") ? "Yes" : "No"}</p>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="from-purple-900 to-blue-900 flex items-center justify-between bg-gradient-to-r px-6 py-6">
        <div>
          <p className="mb-1 text-sm text-[#b7b7b7]">Event Check-in</p>
          <h3 className="text-xl font-semibold leading-tight text-white">
            Upper Year Co-op Panel
          </h3>
        </div>
        <button className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#11b981]">
          <Check className="h-6 w-6 text-white" />
        </button>
      </div>
    </div>
  ));
}
