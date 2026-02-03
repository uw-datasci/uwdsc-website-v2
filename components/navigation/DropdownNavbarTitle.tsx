import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-feather";
import { RiArrowDropDownLine } from "react-icons/ri";
import Image from "next/image";
import { motion } from "framer-motion";

// Valentine's themed Speed Dataing component
function SpeedDataingNavItem() {
  return (
    <motion.span
      className="relative flex items-center gap-1 font-bold"
      whileHover="hover"
    >
      {/* Left heart */}
      <motion.span
        className="text-valentine-red"
        variants={{
          hover: {
            scale: [1, 1.3, 1],
            transition: { duration: 0.5, repeat: Infinity },
          },
        }}
      >
        ♥
      </motion.span>

      {/* Main text with gradient */}
      <motion.span
        className="bg-gradient-to-r from-valentine-lightRed via-valentine-pink to-valentine-lightRed bg-clip-text text-transparent"
        style={{ backgroundSize: "200% 100%" }}
        variants={{
          hover: {
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            transition: { duration: 2, repeat: Infinity, ease: "linear" },
          },
        }}
      >
        Speed Dataing
      </motion.span>

      {/* Right heart */}
      <motion.span
        className="text-valentine-red"
        variants={{
          hover: {
            scale: [1, 1.3, 1],
            transition: { duration: 0.5, repeat: Infinity, delay: 0.25 },
          },
        }}
      >
        ♥
      </motion.span>

      {/* Floating hearts on hover */}
      <motion.span
        className="pointer-events-none absolute -top-2 left-1/2 text-xs text-valentine-lightRed"
        initial={{ opacity: 0, y: 0 }}
        variants={{
          hover: {
            opacity: [0, 1, 0],
            y: [0, -15],
            transition: { duration: 1, repeat: Infinity },
          },
        }}
      >
        ♥
      </motion.span>
      <motion.span
        className="pointer-events-none absolute -top-1 left-1/3 text-[10px] text-valentine-lightPink"
        initial={{ opacity: 0, y: 0 }}
        variants={{
          hover: {
            opacity: [0, 1, 0],
            y: [0, -12],
            transition: { duration: 1.2, repeat: Infinity, delay: 0.3 },
          },
        }}
      >
        ♥
      </motion.span>
      <motion.span
        className="pointer-events-none absolute -top-1 right-1/3 text-[10px] text-valentine-pink"
        initial={{ opacity: 0, y: 0 }}
        variants={{
          hover: {
            opacity: [0, 1, 0],
            y: [0, -14],
            transition: { duration: 0.9, repeat: Infinity, delay: 0.6 },
          },
        }}
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
            <div
              className="absolute z-50 mt-8 w-[150px]
               rounded-xl border border-white/30 bg-[#1a1a1a]/90 font-semibold shadow-lg"
            >
              <ul className="py-2 font-normal">
                {item.subNavItems.map((subItem, index) => (
                  <li key={index}>
                    <a
                      href={subItem.route}
                      className="block px-4 py-2 font-semibold hover:underline "
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
        <a
          href={item.route}
          className="shrink-0"
          {...(item.label === "CxC" && {
            target: "_blank",
            rel: "noopener noreferrer",
          })}
        >
          {item.label === "CxC" ? (
            <Image
              src="/logos/cxc_logo.svg"
              alt="CxC Logo"
              width={50}
              height={25}
              className="h-[25px] w-[50px] min-w-[50px]"
            />
          ) : item.label === "Speed Dataing" ? (
            <SpeedDataingNavItem />
          ) : (
            item.label
          )}
        </a>
      )}
    </div>
  );
}

export default DropdownNavbarTitle;
