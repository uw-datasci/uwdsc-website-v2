import React from "react";

interface ArrowButtonProps {
  onClick: () => void;
  disabled: boolean;
  label: string;
}

const ArrowButton: React.FC<ArrowButtonProps> = ({
  onClick,
  disabled,
  label,
}) => {
  return (
    <button
      className={`border-gray-300 text-gray-700 rounded-md border px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 
          ${
            disabled
              ? "cursor-not-allowed opacity-50 bg-grey1"
              : "hover:bg-gray-50 focus:ring-indigo-500 bg-pureWhite"
          }`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default ArrowButton;
