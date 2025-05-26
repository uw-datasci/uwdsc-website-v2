import { X, Check, Info, Clock, CircleCheck, CircleX } from "lucide-react";
import { useState, useEffect } from "react";

interface memCardProps {
  userInfo: {
    username: string;
    email: string;
    faculty: string;
    hasPaid: boolean;
  },
  checkedIn: boolean,
  selectedEvent: any,
  onCheckIn: () => Promise<void>,
}
export default function MemCard(props: memCardProps) {
  const [time, setTime] = useState("");

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
  return (
    <div className="mx-auto w-[90%] max-w-md overflow-hidden rounded-3xl bg-[url('/membershipCard/memCardBg.svg')] bg-cover bg-center shadow-2xl">
      {/* Header */}
      <div
        className={`flex items-center justify-center gap-3 ${
          props.userInfo.hasPaid
            ? props.checkedIn
              ? "bg-[#11b981]"
              : "bg-[#f59e0c]"
            : "bg-[#ef4444]"
        } px-6 py-4`}
      >
        {!props.userInfo.hasPaid && (
          <CircleX className="h-8 w-8 stroke-[1.5] text-white" />
        )}
        {props.userInfo.hasPaid && !props.checkedIn && (
          <Clock className="h-6 w-6 text-white" />
        )}
        {props.userInfo.hasPaid && props.checkedIn && (
          <CircleCheck className="h-6 w-6 stroke-[1.5] text-white md:h-8 md:w-8" />
        )}
        <span className="text-xl font-semibold text-white md:text-2xl">
          Checked In
        </span>
      </div>

      {/* Main Card Content */}
      <div className="relative overflow-hidden px-6 py-6 md:py-8">
        <div className="relative z-10">
          {/* Profile and Title */}
          <div className="mb-8 flex items-center gap-4">
            {/* Replcae with DSC Logo later */}
            <div className="h-14 w-14 md:h-16 md:w-16 rounded-full bg-[#959595] shrink-0"></div>
            <div>
              <h2 className="mb-1 text-2xl font-bold text-white md:text-3xl">
                UW Data Science Club
              </h2>
              <p className="text-base font-semibold text-white opacity-60 md:text-xl">
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
            <p className="md:text-base mb-2 text-sm font-semibold text-[#8ba3d9]">
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
                  <p className="md:text-base mb-1 text-xs font-semibold text-[#8ba3d9]">
                    Current Time
                  </p>
                  <p className="text-xl md:text-2xl font-bold text-white">{time}</p>
                </div>
                <div>
                  <p className="md:text-base mb-1 text-xs font-semibold text-[#8ba3d9]">
                    MathSoc Member
                  </p>
                  <p className="text-xl md:text-2xl font-bold text-white">
                    {props.userInfo.faculty === "Math" ? "Yes" : "No"}
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
                You have made your account, but have not paid your $4 fee. View
                instructions
              </p>
            </div>
          )}
        </div>
      </div>
      <hr className="border-t-[1px] border-white opacity-50" />
      {/* Bottom Section */}
      <div className="flex items-center justify-between px-6 py-6">
        <div>
          <p className="pb-1 text-sm font-semibold text-[#acc2ff] md:text-lg">
            Event Check-in
          </p>
          <div className="grid grid-cols-2 items-center">
            <h3 className="text-xl font-semibold leading-tight text-white md:text-2xl">
            {props.selectedEvent ? (
                <p>{props.selectedEvent.name}</p>
              ) : (
                <p>No events running</p>
              )}
            </h3>
            <div className="flex justify-end">
              {props.userInfo.hasPaid && !props.checkedIn && (
                <button
                  className="text-base rounded-md bg-[#f59e0c] px-3 py-1 font-semibold text-white shadow-lg hover:bg-[#e8890b] md:rounded-xl md:px-5 md:py-3 md:text-lg"
                  onClick={props.onCheckIn}
                >
                  Check-In
                </button>
              )}
              {!props.userInfo.hasPaid && !props.checkedIn && (
                <button className="flex h-12 w-12 items-center justify-center rounded-md border-2 border-white bg-[#11b981] md:h-14 md:w-14 md:rounded-lg">
                  <X className="h-6 w-6 text-white" />
                </button>
              )}
              {props.userInfo.hasPaid && props.checkedIn && (
                <button className="flex h-12 w-12 items-center justify-center rounded-md border-2 border-white bg-[#11b981] md:h-14 md:w-14 md:rounded-lg">
                  <Check className="h-6 w-6 text-white" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
