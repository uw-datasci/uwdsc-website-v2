import { useState } from "react";

type CheckboxProps = {
  id: string;
  name: string;
  checkboxString: string;
  value: boolean;
  onChange: (e: React.ChangeEvent<any>) => void;
  wrapperClasses?: string;
};

export default function Checkbox({
  id,
  name,
  checkboxString,
  value,
  onChange,
  wrapperClasses,
}: CheckboxProps) {
  const [checked, setChecked] = useState(value);
  const svgStyle: React.CSSProperties = {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeDasharray: "100",
    strokeDashoffset: checked ? "0" : "101",
  };
  return (
    <div id={id} className={`flex items-center gap-4 ${wrapperClasses}`}>
      <input
        id={`checkbox-${id}`}
        name={name}
        type="checkbox"
        value={checkboxString}
        checked={checked}
        onChange={(e) => {
          setChecked(!checked);
          console.log(e);
          onChange(e);
        }}
        className="peer absolute appearance-none opacity-0"
      />
      <label
        htmlFor={`checkbox-${id}`}
        className={`block h-[1.2rem] w-[1.2rem] cursor-pointer rounded-xs border-[1px]  transition-transform duration-200 ease-in-out peer-hover:scale-[1.03] peer-active:scale-[1.05] peer-active:rounded-[0.4rem] ${
          checked ? "border-white" : "border-grey1"
        }`}
      >
        <svg viewBox="0,0,50,50" className="pointer-events-none p-[5%]">
          <path
            d="M5 30 L 20 45 L 45 5"
            className={`[cubic-bezier(1,0,.37,.91)] fill-none stroke-[4px] transition-all duration-[250ms] ${
              checked ? "stroke-white" : "stroke-grey1"
            }`}
            style={svgStyle}
          ></path>
        </svg>
      </label>
      <span className={checked ? "text-white" : "text-grey1"}>
        {checkboxString}
      </span>
    </div>
  );
}
