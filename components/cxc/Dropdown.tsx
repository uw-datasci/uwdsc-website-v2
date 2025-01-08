import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

interface DropdownProps {
  options: string[];
  placeholder: string;
  onSelect?: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  placeholder,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelect = (option: string) => {
    setSelectedValue(option);
    setIsOpen(false);
    if (onSelect) {
      onSelect(option);
    }
  };

  return (
    <div className="relative w-full">
      <div
        className="flex w-full cursor-pointer items-center justify-between rounded-sm border border-white bg-[#332F39] px-4 py-2 font-jersey font-thin tracking-wider text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`${selectedValue ? "text-white" : "text-gray-400"}`}>
          {selectedValue || placeholder}
        </span>
        <IoIosArrowForward
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-90" : ""
          }`}
        />
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-sm border border-white bg-[#332F39] shadow-lg">
          {options.map((option, index) => (
            <div
              key={index}
              className="cursor-pointer px-4 py-2 font-jersey font-thin tracking-wider text-white hover:bg-[#454149]"
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
