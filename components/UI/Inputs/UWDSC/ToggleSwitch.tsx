import { useState } from "react";

type ToggleSwitchProps = {
  id: string;
  name: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<any>) => void;
  onBlur?: (e: React.FocusEvent<any>) => void;
  wrapperClasses?: string;
};

export default function ToggleSwitch({
  id,
  name,
  label,
  checked,
  onChange,
  onBlur,
  wrapperClasses,
}: ToggleSwitchProps) {
  return (
    <div className={`flex items-center ${wrapperClasses}`}>
      <input
        id={id}
        name={name}
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={onChange}
        onBlur={onBlur}
      />
      <label htmlFor={id} className="relative flex cursor-pointer items-center">
        <div
          className={`block h-6 w-11 rounded-full ${
            checked ? "bg-green" : "bg-red"
          } transition`}
        >
          <div
            className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform ${
              checked ? "translate-x-5" : "translate-x-0"
            }`}
          ></div>
        </div>
        <span className="ml-2 text-sm font-medium text-white">{label}</span>
      </label>
    </div>
  );
}
