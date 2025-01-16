import React, { useEffect } from "react";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";

type UserCheckInProps = {
  toDisplay: any;
  userInfo: any;
  registrationInfo: any;
  isCheckedIn: boolean;
  isSelected: boolean;
  error: boolean;
  errorMessage: string;
};

export default function UserCheckInCard({
  toDisplay,
  userInfo,
  registrationInfo,
  isCheckedIn,
  isSelected,
  error,
  errorMessage,
}: UserCheckInProps) {
  return (
    <div className="mx-auto max-w-sm rounded-lg bg-white p-6 shadow-md">
      <h2 className="m-auto text-2xl font-bold">
        {userInfo.username ?? "Not found"}
      </h2>
      <div className="mb-4 flex flex-row border-b-[1px] py-2">
        <div
          className={`mx-2flex my-auto h-fit w-fit items-center justify-center rounded-sm p-1 text-[0.7rem] font-medium text-black ${
            isCheckedIn ? "bg-[#4ADE80]" : "bg-[#EF4444]"
          }`}
        >
          {isCheckedIn ? "Checked In" : "Not Checked In"}
        </div>
        <div
          className={`mx-2 my-auto flex h-fit w-fit items-center justify-center rounded-sm p-1 text-[0.7rem] font-medium text-black ${
            isSelected ? "bg-[#4ADE80]" : "bg-[#EF4444]"
          }`}
        >
          {isSelected ? "Selected" : "Not Selected"}
        </div>
      </div>
      <div className="space-y-3">
        {error ? (
          <div
            className={
              "rounded-sm bg-[#EF4444] text-center font-medium text-black"
            }
          >
            <strong>ERROR: </strong>
            {errorMessage}
          </div>
        ) : (
          <>
            {Object.keys(toDisplay.user).map((key) => {
              return (
                <>
                  <div>
                    <strong>{toDisplay.user[key] + ": "}</strong>
                    {userInfo[key]}
                  </div>
                </>
              );
            })}
            {toDisplay.registrant ? (
              <>
                <h3 className="italic underline">Registered Info:</h3>
                {Object.keys(toDisplay.registrant).map((key) => {
                  return (
                    <>
                      <div>
                        <strong>{toDisplay.registrant[key] + ": "}</strong>
                        {registrationInfo[key]}
                      </div>
                    </>
                  );
                })}
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    </div>
  );
}
