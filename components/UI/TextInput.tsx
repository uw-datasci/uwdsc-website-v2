type TextInputProps = {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  classes?: string;
};

export default function TextInput({
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  classes,
}: TextInputProps) {
  return (
    <input
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      className={`transition-300 w-full rounded-md border border-grey1 bg-black px-4.5 py-3.5 text-white outline-none placeholder:text-grey1 focus:border-white xl:rounded-lg xl:px-6 xl:py-4.5 ${classes}`}
    />
  );
}
