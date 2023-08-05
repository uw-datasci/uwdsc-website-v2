import { ChangeEventHandler, FocusEventHandler } from "react";

type textInputType = {
  inputType: string;
  id: string;
  name: string;
  type?: string;
  onChange: ChangeEventHandler;
  onBlur: FocusEventHandler;
  onFocus: FocusEventHandler;
  value: any;
  placeholder: string;
  classes?: string;
};

export default function TextInput(props: textInputType) {
  const {
    inputType,
    id,
    name,
    type,
    onChange,
    onBlur,
    onFocus,
    value,
    placeholder,
    classes,
  } = props;

  const inputClasses = `text-white placeholder:text-grey1 bg-grey4 w-full rounded-md pl-4.5 pr-24 py-3.5 outline-none border border-grey1 transition-300 focus:border-white xl:px-6 xl:py-4.5 xl:text-lg xl:pr-32 ${classes}`;

  return inputType === "textinput" ? (
    <input
      id={id}
      name={name}
      type={type}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      value={value}
      placeholder={placeholder}
      className={inputClasses}
    />
  ) : (
    <textarea
      id={id}
      name={name}
      rows={8}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      value={value}
      placeholder={placeholder}
      className={inputClasses}
    />
  );
}
