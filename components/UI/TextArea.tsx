type TextAreaProps = {
  id: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  classes?: string;
};

export default function TextArea({
  id,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  classes,
}: TextAreaProps) {
  return (
    <textarea
      name={name}
      id={id}
      rows={8}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      className={`text-white placeholder:text-grey1 bg-black w-full rounded-md px-4.5 py-3.5 outline-none border border-grey1 transition-300 focus:border-white xl:rounded-lg xl:px-6 xl:py-4.5 ${classes}`}
    />
  );
}
