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
      className={`text-white placeholder:text-grey1 bg-black w-full rounded-md px-4.5 py-3.5 outline-none border border-grey1 transition-300 focus:border-white xl:rounded-lg xl:px-6 xl:py-4.5 ${classes}`}
    />
  );
}
