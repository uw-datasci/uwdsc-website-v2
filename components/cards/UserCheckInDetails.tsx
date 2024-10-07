import React, { useEffect } from "react";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";

type UserCheckInProps = {
  username: string;
  uwEmail: string;
  faculty: string;
  hasPaid: boolean;
  isCheckedIn: boolean;
  error: boolean;
  errorMessage: string;
};

export default function UserCheckInCard({
  username,
  uwEmail,
  faculty,
  hasPaid,
  isCheckedIn,
  error,
  errorMessage,
}: UserCheckInProps) {

  useEffect(() => {
    console.log(error);
  }, [])

  return (
    <div className="mx-auto max-w-sm rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">{username}</h2>
      <div className="space-y-3">
        {error ? 
        (
          <div 
            className={"text-center rounded-sm font-medium text-black bg-[#EF4444]"}
          >
            <strong>ERROR: </strong>
            {errorMessage}
          </div>
        ) : 
        (
          <>
            <div>
              <strong>UW Email: </strong>
              {uwEmail}
            </div><div>
              <strong>Faculty: </strong>
              {faculty}
            </div><div className="flex flex-row gap-6 justify-center">
              <div className="flex items-center">
                <div
                  className={`flex h-12 w-32 items-center justify-center rounded-sm text-xs font-medium text-black ${hasPaid ? "bg-[#4ADE80]" : "bg-[#EF4444]"}`}
                >
                  {hasPaid ? "Paid" : "Unpaid"}
                </div>
              </div>
              <div className="flex items-center">
                <div
                  className={`flex h-12 w-32 items-center justify-center rounded-sm text-xs font-medium text-black ${isCheckedIn ? "bg-[#4ADE80]" : "bg-[#EF4444]"}`}
                >
                  {isCheckedIn ? "Checked In" : "Not Checked In"}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
