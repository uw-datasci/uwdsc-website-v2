import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-feather";
import { RiArrowDropDownLine } from "react-icons/ri";
import { motion } from "framer-motion";

// Valentine's themed Speed Dataing component for mobile
function SpeedDataingNavItemMobile() {
  return (
    <motion.span
      className="relative flex items-center gap-2"
      initial="initial"
      animate="animate"
    >
      {/* Left heart */}
      <motion.span
        className="text-valentine-red"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        ♥
      </motion.span>

      {/* Main text with gradient */}
      <span className="bg-gradient-to-r from-valentine-lightRed via-valentine-pink to-valentine-lightRed bg-clip-text text-transparent">
        Speed Dataing
      </span>

      {/* Right heart */}
      <motion.span
        className="text-valentine-red"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
      >
        ♥
      </motion.span>

      {/* Floating hearts */}
      <motion.span
        className="pointer-events-none absolute -top-4 left-1/2 text-lg text-valentine-lightRed"
        animate={{
          opacity: [0, 1, 0],
          y: [0, -20],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        ♥
      </motion.span>
      <motion.span
        className="pointer-events-none absolute -top-3 left-1/4 text-sm text-valentine-lightPink"
        animate={{
          opacity: [0, 1, 0],
          y: [0, -18],
        }}
        transition={{ duration: 2.2, repeat: Infinity, delay: 0.5 }}
      >
        ♥
      </motion.span>
      <motion.span
        className="pointer-events-none absolute -top-3 right-1/4 text-sm text-valentine-pink"
        animate={{
          opacity: [0, 1, 0],
          y: [0, -22],
        }}
        transition={{ duration: 1.8, repeat: Infinity, delay: 1 }}
      >
        ♥
      </motion.span>
    </motion.span>
  );
}

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
            <div className="w-[150px]  rounded-md text-xl">
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
          <hr className="my-4 border-t-2 border-white " />
        </>
      ) : (
        /* Standalone link */
        <>
          <a href={item.route}>
            {item.label === "Speed Dataing" ? (
              <SpeedDataingNavItemMobile />
            ) : (
              item.label
            )}
          </a>
          <hr className="my-4 border-t-2 border-white" />
        </>
      )}
    </div>
  );
}

export default DropdownNavbarTitleCollapse;
