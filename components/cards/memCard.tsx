import { X, Check, Info, Clock, CircleCheck, CircleX } from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import {
  setLatestEvent,
  setRegistrationStatus,
} from "@/store/slices/latestEventSlice";
import {
  patchCheckInRegistrantByIdUser,
  getLatestEvent,
  getCurrentUserRegistrationByID,
} from "@/utils/apiCalls";
import Image from "next/image";
import { UserInfo } from "@/pages/memCheckIn";
import LoadingSpinner from "../UI/LoadingSpinner";

interface Event {
  _id: string;
  id: string;
  name: string;
}

interface MemCardProps {
  userInfo: UserInfo;
}

export default function MemCard(props: MemCardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { event: latestEvent, isCheckedIn } = useSelector(
    (state: RootState) => state.latestEvent,
  ) as { event: Event | null; isCheckedIn: boolean };
  const userToken = useSelector((state: RootState) => state.loginToken.token);

  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(true);


  const getUserId = () => {
    if (!userToken) return null;
    try {
      return JSON.parse(atob(userToken.split(".")[1])).user.id;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const userId = getUserId();

  // Fetch latest event
  useEffect(() => {
    const fetchLatestEvent = async () => {
      try {
        const response = await getLatestEvent();
        if (response.data) {
          dispatch(setLatestEvent(response.data));
        }
      } catch (err: any) {
        console.error("Error fetching latest event:", err);
      }
    };

    fetchLatestEvent();
  }, [dispatch]);

  // Fetch registration status
  useEffect(() => {
    const getRegistrant = async () => {
      if (!userId) {
        return;
      }
      else if (!latestEvent) {
        setLoading(false);
        return;
      }

      try {
        const response = await getCurrentUserRegistrationByID();
        const isRegistered = response.data.exist;
        dispatch(
          setRegistrationStatus({
            isRegistered,
            isCheckedIn: isRegistered ? response.data.checkedIn : false,
          }),
        );
      } catch (err) {
        console.error("Error fetching check-in status:", err);
        dispatch(
          setRegistrationStatus({ isRegistered: false, isCheckedIn: false }),
        );
      } finally {
        setLoading(false);
      }
    };

    getRegistrant();
  }, [latestEvent, userId, dispatch]);

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
    if (!latestEvent) return;
    console.log(latestEvent._id);
    console.log(getUserId());

    try {
      const response = await patchCheckInRegistrantByIdUser(
        latestEvent._id,
        getUserId(),
      );
      console.log(response.data);
      if (response.data.registrant.checkedIn) {
        dispatch(setRegistrationStatus({ isRegistered: true, isCheckedIn: true }));
      }
    } catch (error) {
      console.error("Error checking in:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md overflow-hidden rounded-3xl bg-[url('/membershipCard/memCardBg.svg')] bg-cover bg-center shadow-2xl">
      {/* Header */}
      <div
        className={`flex items-center justify-center gap-3 ${
          props.userInfo.hasPaid
            ? isCheckedIn
              ? "bg-[#11b981]"
              : "bg-[#f59e0c]"
            : "bg-[#ef4444]"
        } px-6 py-4`}
      >
        {!props.userInfo.hasPaid && (
          <CircleX className="h-8 w-8 stroke-[1.75] text-white" />
        )}
        {props.userInfo.hasPaid && !isCheckedIn && (
          <Clock className="h-6 w-6 text-white" />
        )}
        {props.userInfo.hasPaid && isCheckedIn && (
          <CircleCheck className="h-6 w-6 stroke-[1.75] text-white md:h-8 md:w-8" />
        )}
        <span className="text-xl font-semibold text-white md:text-2xl">
          {isCheckedIn ? "Checked In" : "Not Checked In"}
        </span>
      </div>

      {/* Main Card Content */}
      <div className="relative overflow-hidden px-6 py-6 md:py-8">
        <div className="relative z-10">
          {/* Profile and Title */}
          <div className="mb-8 flex items-center">
            <div className="grid items-center justify-center gap-x-6 [grid-template-columns:auto_1fr] [grid-template-rows:auto_auto] md:gap-x-8">
              <div className="col-start-1 row-start-1 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-black p-2 md:h-16 md:w-16">
                <Image
                  src="/logos/dsc.svg"
                  alt="DSC Logo"
                  width={64}
                  height={64}
                  className="ml-1 h-[75%] w-[75%] overflow-hidden"
                />
              </div>
              <h2 className="col-start-2 row-start-1 w-full whitespace-pre text-2xl font-extrabold text-white md:text-3xl">
                <span className="hidden md:block">UW Data Science Club</span>
                <span className="block w-full md:hidden">{`UW Data\nScience Club`}</span>
              </h2>
              <p className="text-base col-start-2 row-start-2 font-semibold text-white opacity-60 md:text-xl">
                Term Membership Card
              </p>
            </div>
          </div>

          {/* Member Info Card */}
          <div
            className={`${
              props.userInfo.hasPaid ? "rounded-2xl md:mb-8" : "rounded-t-2xl"
            } bg-white/10 p-5 backdrop-blur-sm md:p-6`}
          >
            <p className="md:text-base mb-1 text-sm font-semibold text-[#8ba3d9]">
              Member
            </p>
            <h2
              className={`${
                props.userInfo.hasPaid ? "mb-6" : ""
              } text-xl font-bold text-white md:text-2xl`}
            >
              {props.userInfo.username}
            </h2>
            {props.userInfo.hasPaid && (
              <div className="grid grid-cols-2 gap-2 md:gap-4">
                <div>
                  <p className="md:text-base mb-1 text-sm font-semibold text-[#8ba3d9]">
                    Current Time
                  </p>
                  <p className="text-xl font-bold text-white md:text-2xl">
                    {time}
                  </p>
                </div>
                <div>
                  <p className="md:text-base mb-1 text-sm font-semibold text-[#8ba3d9]">
                    MathSoc Member
                  </p>
                  <p className="text-xl font-bold text-white md:text-2xl">
                    {props.userInfo.isMathSocMember ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            )}
          </div>
          {!props.userInfo.hasPaid && (
            <div className="flex items-center gap-4 rounded-b-2xl bg-white/25 p-6 backdrop-blur-sm">
              {/* Info Message */}
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-black">
                <Info className="h-7 w-7 text-white" />
              </div>
              <p className="text-sm leading-relaxed text-white">
                You have made your account, but have not paid your $4 fee. See
                an executive for assistance.
              </p>
            </div>
          )}
        </div>
      </div>
      <hr className="border-t-[1px] border-white opacity-50" />
      {/* Bottom Section */}
      <div className="flex w-full items-center justify-between px-6 pb-5 pt-4">
        <div className="w-full">
          <p className="text-sm font-semibold text-[#acc2ff] md:text-lg">
            Event Check-in
          </p>
          <div
            className={`w-full ${
              props.userInfo.hasPaid && !isCheckedIn
                ? "grid grid-cols-3 items-center justify-center gap-3"
                : "flex items-center justify-between"
            }`}
          >
            <h3 className="col-span-2 text-xl font-semibold leading-tight text-white md:text-2xl pr-5">
              {latestEvent ? (
                <p>{latestEvent.name}</p>
              ) : (
                <p>No events running</p>
              )}
            </h3>
            <div className="flex justify-end">
              {props.userInfo.hasPaid && !isCheckedIn && (
                <button
                  className="text-base rounded-md bg-[#f59e0c] p-2 font-bold text-white shadow-lg hover:bg-[#e8890b] md:px-4 md:py-3 md:text-xl"
                  onClick={handleCheckIn}
                >
                  Check-In
                </button>
              )}
              {!props.userInfo.hasPaid && (
                <button className="flex h-12 w-12 items-center justify-center rounded-md border-2 border-white bg-[#ef4444] md:h-14 md:w-14 md:rounded-lg">
                  <X className="h-8 w-8 text-white" />
                </button>
              )}
              {props.userInfo.hasPaid && isCheckedIn && (
                <button className="flex h-12 w-12 items-center justify-center rounded-md border-2 border-white bg-[#11b981] md:h-14 md:w-14 md:rounded-lg">
                  <Check className="h-8 w-8 text-white" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
