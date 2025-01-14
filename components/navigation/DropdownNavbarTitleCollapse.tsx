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

interface DropdownNavbarTitleCollapseProps {
  item: NavItem;
}

function DropdownNavbarTitleCollapse({
  item,
}: DropdownNavbarTitleCollapseProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    <div ref={dropdownRef} className="text-5xl font-bold text-white">
      {/* When there are subitems */}
      {item.subNavItems && item.subNavItems.length > 0 ? (
        <>
          <button
            onClick={toggleDropdown}
            className="flex w-full flex-row items-center justify-between"
          >
            {item.label}
            <RiArrowDropDownLine
              className={`transform transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
              size={50}
            />
          </button>
          {isOpen && (
            <div className="w-[150px] rounded-md text-xl">
              <ul className="py-2 font-normal">
                {item.subNavItems.map((subItem, index) => (
                  <li key={index} className="my-2">
                    <a href={subItem.route} className="hover:underline">
                      {subItem.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <hr className="my-4 border-t-2 border-white" />
        </>
      ) : (
        /* Standalone link */
        <>
          <a href={item.route}>{item.label}</a>
          <hr className="my-4 border-t-2 border-white" />
        </>
      )}
    </div>
  );
}

export default DropdownNavbarTitleCollapse;
