import { FormikErrors, FormikTouched } from "formik";
import InputFeedback from "./InputFeedback";

type TextAreaProps = {
  id: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  maxLength: number;
  rows?: number;
  errors: FormikErrors<any>;
  touched: FormikTouched<any>;
  classes?: string;
  autoCap?: string;
};

export default function TextArea({
  id,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  maxLength = 500,
  rows = 4,
  errors,
  touched,
  classes,
  autoCap,
}: TextAreaProps) {
  return (
    <>
      <textarea
        name={name}
        id={id}
        rows={rows}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        className={`${
          classes
            ? "max-h-[7rem]"
            : "" /*Tailwind not rendering the class otherwise (To be fixed)*/
        } transition-300 w-full rounded-md border border-grey1 bg-black px-4.5 py-3.5 text-white outline-none placeholder:text-grey1 focus:border-white xl:rounded-lg xl:px-6 xl:py-4.5`}
        autoCapitalize={autoCap || "on"}
        maxLength={maxLength}
      />
      {touched[name] && errors[name] && (
        <InputFeedback state="error">{errors[name].toString()}</InputFeedback>
      )}
    </>
  );
}
