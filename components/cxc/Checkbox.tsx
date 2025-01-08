import React from "react";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, label }) => {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`flex h-5 w-5 cursor-pointer items-center justify-center rounded-xs border border-white transition-colors ${
          checked ? "bg-[#2200FF]" : "bg-transparent"
        }`}
        onClick={() => onChange(!checked)}
      ></div>
      {label && (
        <label className="cursor-pointer font-jersey font-thin tracking-wider text-white">
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
