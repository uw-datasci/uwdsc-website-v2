import React from "react";

interface SubmitProps {
  text: string;
  onClick?: () => void;
}

const Submit: React.FC<SubmitProps> = ({ text, onClick }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="w-fit rounded-sm border-2 border-black bg-[#2200FF] px-8 py-3 font-jersey font-thin tracking-wider text-white transition-all hover:bg-[#1a00cc] focus:outline-none focus:ring-2 focus:ring-black"
    >
      {text}
    </button>
  );
};

export default Submit;