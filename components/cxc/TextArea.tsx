import React from "react";

interface TextAreaProps {
  placeholder: string;
  maxLength?: number;
  rows?: number;
}

const TextArea: React.FC<TextAreaProps> = ({
  placeholder,
  maxLength = 500,
  rows = 4,
}) => {
  return (
    <textarea
      placeholder={placeholder}
      maxLength={maxLength}
      rows={rows}
      className="h-20 w-full resize-none rounded-sm border border-white bg-[#332F39] px-4 py-2 font-jersey font-thin tracking-wider text-white focus:outline-none focus:ring-2 focus:ring-white"
    />
  );
};

export default TextArea;
