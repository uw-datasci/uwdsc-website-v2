import { useState } from "react";
import Link from "next/link";
import { Instagram, Linkedin, Mail, Youtube } from "react-feather";

import Button from "@/components/UI/Button";
import GradientBorder from "@/components/UI/GradientBorder";
import Logo from "@/components/UI/Logo";

const ROUTES = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Join Us",
    link: "https://docs.google.com/forms/u/3/d/e/1FAIpQLSdbUWqHDQy8fHaiHEQeB3OeiFJWcTfeXed-qhd6MklJNJh06g/viewform?usp=send_form",
  },
  {
    label: "CxC",
    route: "/cxc",
  },
  {
    label: "Team",
    route: "/team",
  },
  {
    label: "Contact",
    route: "/#contact",
  },
];

const SOCIALS = [
  {
    icon: <Mail className="w-6 text-white" />,
    href: "mailto:contact@uwdatascience.ca",
  },
  {
    icon: <Instagram className="w-6 text-white" />,
    href: "https://www.instagram.com/uwaterloodsc/",
  },
  {
    icon: <Linkedin className="w-6 text-white" />,
    href: "https://www.linkedin.com/company/waterloo-data-science-club/",
  },
  {
    icon: <Youtube className="w-6 text-white" />,
    href: "https://www.youtube.com/channel/UCknY88pglf2xz_S72WHIDxg",
  },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  return (
    <>
      <header className="mx-nav relative z-50 mt-8 flex items-center justify-between lg:mt-12">
        <Logo />
        <nav className="hidden gap-16 lg:flex">
          {ROUTES.map((route) => {
            if (route.link) {
              return (
                <a
                  href={route.link}
                  target="_blank"
                  className="font-semibold text-white"
                  key={route.label}
                >
                  {route.label}
                </a>
              );
            } else if (route.route) {
              return (
                <Link
                  href={route.route}
                  className="font-semibold text-white"
                  key={route.label}
                >
                  {route.label}
                </Link>
              );
            }
          })}
        </nav>
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="flex flex-col gap-[5px] lg:hidden"
        >
          <div
            className={`transition-300 h-[5px] w-[22px] rounded-full bg-white ${
              isMobileMenuOpen ? "translate-x-[10px]" : ""
            }`}
          />
          <div className="h-[5px] w-8 rounded-full bg-white" />
          <div
            className={`transition-300 h-[5px] w-[22px] rounded-full bg-white ${
              isMobileMenuOpen ? "" : "translate-x-[10px]"
            }`}
          />
        </button>
        <Button
          type="link"
          href="https://docs.google.com/forms/u/3/d/e/1FAIpQLSdbUWqHDQy8fHaiHEQeB3OeiFJWcTfeXed-qhd6MklJNJh06g/viewform?usp=send_form"
          hierarchy="primary"
          font="font-bold"
          rounded="rounded-md"
          classes="hidden lg:block"
        >
          Join Us
        </Button>
      </header>
      <div
        className={`transition-300 fixed inset-0 z-40 bg-black lg:hidden ${
          isMobileMenuOpen ? "" : "translate-x-full"
        }`}
      >
        <div className="bg-gradient pointer-events-none absolute inset-0 opacity-10" />
        <nav className="mx-container mt-36 grid gap-8">
          {ROUTES.map((route) => {
            if (route.link) {
              return (
                <a
                  href={route.link}
                  target="_blank"
                  className="text-5xl font-bold text-white"
                  key={route.label}
                >
                  {route.label}
                </a>
              );
            } else if (route.route) {
              return (
                <Link
                  href={route.route}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-5xl font-bold text-white"
                  key={route.label}
                >
                  {route.label}
                </Link>
              );
            }
          })}
        </nav>
        <div className="absolute inset-x-0 bottom-12 flex justify-center gap-4">
          {SOCIALS.map(({ icon, href }, i) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              key={`social-${i}`}
            >
              <GradientBorder rounded="rounded-sm">
                <div className="rounded-[7px] bg-black p-2.5">{icon}</div>
              </GradientBorder>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
