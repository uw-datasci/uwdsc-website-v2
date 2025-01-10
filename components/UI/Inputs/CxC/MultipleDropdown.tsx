import { FormikErrors, FormikTouched } from "formik";
import { useEffect, useState } from "react";
import { ChevronDown } from "react-feather";
import InputFeedback from "./InputFeedback";

type MultipleDropdownProps = {
  id: string;
  name: string;
  placeholder: string;
  options: string[];
  value: string[];
  onChange: (e: React.ChangeEvent<any>) => void;
  errors: FormikErrors<any>;
  touched: FormikTouched<any>;
  maxSelection: number;
  wrapperClasses?: string;
};

export default function MultipleDropdown({
  id,
  name,
  placeholder,
  options,
  value,
  onChange,
  errors,
  touched,
  wrapperClasses,
  maxSelection,
}: MultipleDropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (
        isOpen &&
        !e
          .composedPath()
          .includes(document.querySelector(`#dropdown-${id}`) as HTMLElement)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [id, isOpen]);

  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { checked, value: clickedValue } = e.target;

    let newValue = [...value];
    if (checked) {
      newValue.push(clickedValue);
    } else {
      newValue = newValue.filter((item) => item !== clickedValue);
    }

    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        name,
        value: newValue,
      },
    } as React.ChangeEvent<any>;

    onChange(syntheticEvent);
  }

  return (
    <>
      <div
        id={`dropdown-${id}`}
        className={wrapperClasses ? wrapperClasses : "relative cursor-pointer"}
      >
        <div
          onClick={(e) => {
            setIsOpen((prev) => !prev);
          }}
          className={`transition-300 relative cursor-pointer rounded-md border px-4.5 py-3.5 xl:rounded-lg xl:px-6 xl:py-4.5 ${
            isOpen ? "border-white" : "border-grey1"
          }`}
        >
          <p
            className={`transition-300 ${
              value.length > 0 ? "text-white" : "text-grey1"
            }`}
          >
            {value.length > 0 ? value.sort().join(", ") : placeholder}
          </p>
          <ChevronDown
            className={`transition-300 absolute right-4 top-1/2 -translate-y-1/2 ${
              isOpen ? "rotate-180 text-white" : "text-grey1"
            }`}
          />
        </div>
        <div
          className={`transition-300 absolute inset-x-0 top-[calc(100%+16px)] max-h-[15rem] overflow-auto rounded-lg border border-grey1 bg-black px-2 py-2 ${
            isOpen ? "z-10" : "pointer-events-none opacity-0"
          }`}
        >
          {options.map((option, i) => {
            const [checked, setChecked] = useState(value.includes(option));
            const svgStyle: React.CSSProperties = {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeDasharray: "100",
              strokeDashoffset: checked ? "0" : "101",
            };
            return (
              <label
                key={`option-${i}`}
                className="transition-300 flex cursor-pointer items-center gap-4 
                         rounded-sm px-3 py-3.5 hover:bg-grey4 xl:px-4 xl:py-4"
              >
                <input
                  id={option}
                  name={name}
                  type="checkbox"
                  value={option}
                  checked={checked}
                  onChange={(e) => {
                    if (value.length < maxSelection || checked) {
                      setChecked(!checked);
                      handleCheckboxChange(e);
                    }
                  }}
                  className="peer absolute appearance-none opacity-0"
                />
                <label
                  htmlFor={option}
                  className={`block h-[1.2rem] w-[1.2rem] cursor-pointer rounded-xs border-[1px]  transition-transform duration-200 ease-in-out peer-hover:scale-[1.03] peer-active:scale-[1.05] peer-active:rounded-[0.4rem] ${
                    checked ? "border-white" : "border-grey1"
                  }`}
                >
                  <svg
                    viewBox="0,0,50,50"
                    className="pointer-events-none p-[5%]"
                  >
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
                  {option}
                </span>
              </label>
            );
          })}
        </div>
      </div>
      {touched[name] && errors[name] && (
        <InputFeedback state="error">{errors[name].toString()}</InputFeedback>
      )}
    </>
  );
}
