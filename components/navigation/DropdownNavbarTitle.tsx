import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-feather";
import { RiArrowDropDownLine } from "react-icons/ri";

type NavItem = {
  label: string;
  route?: string;
  subNavItems?: SubNavItem[];
};

type SubNavItem = {
  label: string;
  route: string;
};

interface DropdownNavbarTitleProps {
  item: NavItem;
}

function DropdownNavbarTitle({ item }: DropdownNavbarTitleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Reference to the dropdown container

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="font-semibold text-white">
      {/* When there are subitems */}
      {item.subNavItems && item.subNavItems.length > 0 ? (
        <>
          <button onClick={toggleDropdown} className={`flex items-center`}>
            {item.label}
            <RiArrowDropDownLine className="ml-2 " size={20} />
          </button>
          {isOpen && (
            <div className="absolute z-10 mt-4 rounded-md border border-white bg-black w-[150px]">
              <ul className="py-2 font-normal">
                {item.subNavItems.map((subItem, index) => (
                  <li key={index}>
                    <a
                      href={subItem.route}
                      className="hover:underline block px-4 py-2 "
                    >
                      {subItem.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      ) : (
        /* Standalone link */
        <a href={item.route} className="">
          {item.label}
        </a>
      )}
    </div>
  );
}

export default DropdownNavbarTitle;
