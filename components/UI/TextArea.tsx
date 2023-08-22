type TextAreaProps = {
  id: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  classes?: string;
};

export default function TextArea({
  id,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  rows = 8,
  classes,
}: TextAreaProps) {
  return (
    <textarea
      name={name}
      id={id}
      rows={rows}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      className={`transition-300 w-full rounded-md border border-grey1 bg-black px-4.5 py-3.5 text-white outline-none placeholder:text-grey1 focus:border-white xl:rounded-lg xl:px-6 xl:py-4.5 ${classes}`}
    />
  );
}
