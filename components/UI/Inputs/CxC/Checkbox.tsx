import { FormikErrors, FormikTouched } from "formik";
import { useState } from "react";
import InputFeedback from "./InputFeedback";

type CheckboxProps = {
  id: string;
  name: string;
  checkboxString: string;
  value: boolean;
  onChange: (e: React.ChangeEvent<any>) => void;
  errors: FormikErrors<any>;
  touched: FormikTouched<any>;
  wrapperClasses?: string;
};

export default function Checkbox({
  id,
  name,
  checkboxString,
  value,
  onChange,
  errors,
  touched,
  wrapperClasses,
}: CheckboxProps) {
  const svgStyle: React.CSSProperties = {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeDasharray: "100",
    strokeDashoffset: value ? "0" : "101",
  };
  return (
    <>
      <div id={id} className={`flex items-center gap-4 justify-center ${wrapperClasses}`}>
        <input
          id={`checkbox-${id}`}
          name={name}
          type="checkbox"
          value={checkboxString}
          checked={value}
          onChange={(e) => {
            value = !value;
            onChange(e);
          }}
          className="peer absolute appearance-none opacity-0"
        />
        <label
          htmlFor={`checkbox-${id}`}
          className={`block h-[1.2rem] w-[1.2rem] cursor-pointer rounded-xs border-[1px]  transition-transform duration-200 ease-in-out peer-hover:scale-[1.03] peer-active:scale-[1.05] peer-active:rounded-[0.4rem] ${
            value ? "border-white" : "border-grey1"
          }`}
        >
          <svg viewBox="0,0,50,50" className="pointer-events-none p-[5%]">
            <path
              d="M5 30 L 20 45 L 45 5"
              className={`[cubic-bezier(1,0,.37,.91)] fill-none stroke-[4px] transition-all duration-[250ms] ${
                value ? "stroke-white" : "stroke-grey1"
              }`}
              style={svgStyle}
            ></path>
          </svg>
        </label>
        <span className={value ? "text-white" : "text-grey1"}>
          {checkboxString}
        </span>
      </div>
      {touched[name] && errors[name] && (
        <InputFeedback state="error">{errors[name]?.toString()}</InputFeedback>
      )}
    </>
  );
}
