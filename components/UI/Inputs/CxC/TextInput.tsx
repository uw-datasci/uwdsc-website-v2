import { FormikErrors, FormikProps, FormikTouched } from "formik";
import InputFeedback from "./InputFeedback";

type TextInputProps = {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  errors: FormikErrors<any>;
  touched: FormikTouched<any>;
  classes?: string;
  autoCap?: string;
};

export default function TextInput({
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  errors,
  touched,
  classes,
  autoCap,
}: TextInputProps) {
  return (
    <>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        className={
          classes ||
          "transition-300 w-full rounded-md border border-white bg-cxcGrey px-4.5 py-3 text-md text-white outline-none placeholder:text-cxcLightGrey focus:border-white lg:text-lg xl:rounded-lg xl:px-6 xl:py-3.5"
        }
        autoCapitalize={autoCap || "on"}
      />
      {touched[name] && errors[name] && (
        <InputFeedback state="error">{errors[name]?.toString()}</InputFeedback>
      )}
    </>
  );
}
