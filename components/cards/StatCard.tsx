import React from "react";

interface StatCardProps {
  value: string | number;
  label: string;
  icon: React.ReactNode;
  iconBgColour?: string;
  cardBgColour: string;
  borderColour: string;
  statColour: string;
  labelColour: string;
}

export default function StatCard({
  value,
  label,
  icon,
  iconBgColour,
  cardBgColour,
  borderColour,
  statColour,
  labelColour,
}: StatCardProps) {
  return (
    <div
      className={`flex w-fit items-center gap-4 rounded-lg border ${borderColour} ${cardBgColour} px-4 py-2 sm:px-6 sm:py-4`}
    >
      <div
        className={`${iconBgColour ? `${iconBgColour} rounded-sm p-3` : ""}`}
      >
        {icon}
      </div>
      <div className="font-medium">
        <div className={`text-xl sm:text-lg lg:text-xl ${statColour}`}>
          {value}
        </div>
        <div className={`text-md sm:text-sm lg:text-md ${labelColour}`}>
          {label}
        </div>
      </div>
    </div>
  );
}
