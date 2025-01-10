import { Formik, FormikErrors, FormikTouched } from "formik";
import { useEffect, useState } from "react";
import { ChevronDown } from "react-feather";
import InputFeedback from "./InputFeedback";

type SingleDropdownProps = {
  id: string;
  name: string;
  placeholder: string;
  options: string[];
  value: string;
  errors: FormikErrors<any>;
  touched: FormikTouched<any>;
  setTouched: (touched: FormikTouched<any>, shouldValidate?: boolean) => void;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  wrapperClasses?: string;
};

export default function SingleDropdown({
  id,
  name,
  placeholder,
  options,
  value,
  onChange,
  errors,
  touched,
  setTouched,
  wrapperClasses,
}: SingleDropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isTouched, setIsTouched] = useState<boolean>(false);

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

    if (!isOpen && isTouched) {
      setTouched({ ...touched, [name]: true }, true);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [id, isOpen]);

  return (
    <>
      <div className={`relative ${wrapperClasses}`}>
        <div
          id={`dropdown-${id}`}
          onClick={() => {
            setIsTouched(true);
            setIsOpen((prev) => !prev);
          }}
          className={`transition-300 relative cursor-pointer rounded-md border px-4.5 py-3.5 xl:rounded-lg xl:px-6 xl:py-4.5 ${
            isOpen ? "border-white" : "border-grey1"
          }`}
        >
          <p
            className={`transition-300 ${value ? "text-white" : "text-grey1"}`}
          >
            {value ? value : placeholder}
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
          {options.map((option, i) => (
            <p
              onClick={() => {
                onChange({
                  target: {
                    id,
                    name,
                    value: option,
                  },
                } as React.ChangeEvent<HTMLSelectElement>);
                setIsOpen(false);
              }}
              className={`transition-300 cursor-pointer rounded-sm px-3 py-3.5 hover:bg-grey4 xl:px-4 xl:py-4 ${
                option === value ? "text-white" : "text-grey1"
              }`}
              key={`option-${i}`}
            >
              {option}
            </p>
          ))}
        </div>
      </div>
      {touched[name] && errors[name] && (
        <InputFeedback state="error">{errors[name]?.toString()}</InputFeedback>
      )}
    </>
  );
}
