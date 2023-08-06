import { useEffect, useState } from 'react';
import { ChevronDown } from 'react-feather';

type DropdownProps = {
  id: string;
  name: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  classes?: string;
};

export default function Dropdown({
  id,
  name,
  placeholder,
  options,
  value,
  onChange,
  classes,
}: DropdownProps) {
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

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [id, isOpen]);

  return (
    <div className={`relative ${classes}`}>
      <div
        id={`dropdown-${id}`}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`rounded-md cursor-pointer relative px-4.5 py-3.5 border transition-300 xl:rounded-lg xl:px-6 xl:py-4.5 ${
          isOpen ? 'border-white' : 'border-grey1'
        }`}
      >
        <p className={`transition-300 ${value ? 'text-white' : 'text-grey1'}`}>
          {value ? value : placeholder}
        </p>
        <ChevronDown
          className={`absolute right-4 top-1/2 -translate-y-1/2 transition-300 ${
            isOpen ? 'text-white rotate-180' : 'text-grey1'
          }`}
        />
      </div>
      <div
        className={`transition-300 rounded-lg bg-black border px-2 py-2 border-grey1 absolute top-[calc(100%+16px)] inset-x-0 ${
          isOpen ? '' : 'pointer-events-none opacity-0'
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
            className={`transition-300 cursor-pointer rounded-sm px-3 xl:px-4 py-3.5 xl:py-4 hover:bg-grey4 ${
              option === value ? 'text-white' : 'text-grey1'
            }`}
            key={`option-${i}`}
          >
            {option}
          </p>
        ))}
      </div>
    </div>
  );
}
