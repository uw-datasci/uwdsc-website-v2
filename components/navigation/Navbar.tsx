import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { moveUp as signUpMoveUp } from "@/store/slices/signUpPageSlice";
import { moveUp as signInMoveUp } from "@/store/slices/signInPageSlice";
import { RootState } from "@/store/store";

import { Instagram, Linkedin, Mail, Youtube } from "react-feather";

import Button from "@/components/UI/Button";
import GradientBorder from "@/components/UI/GradientBorder";
import Logo from "@/components/UI/Logo";
import { logout } from "@/store/slices/loginTokenSlice";
import DropdownNavbarTitle from "./DropdownNavbarTitle";
import { NAVBAR_ROUTES } from "./navbarPermissions";
import DropdownNavbarTitleCollapse from "./DropdownNavbarTitleCollapse";

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

type NavItem = {
  label: string;
  route?: string;
  subNavItems?: SubNavItem[];
};

type SubNavItem = {
  label: string;
  route: string;
};

export default function Navbar() {
  let dispatch = useDispatch();
  const [routes, setRoutes] = useState<NavItem[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const signedIn = useSelector((state: RootState) => state.loginToken.name);
  const userRole = useSelector((state: RootState) => state.loginToken.role);
  const router = useRouter();

  useEffect(() => {
    if (signedIn) {
      if (userRole === "admin") {
        setRoutes(NAVBAR_ROUTES.ADMIN);
      } else {
        setRoutes(NAVBAR_ROUTES.USER);
      }
    } else {
      setRoutes(NAVBAR_ROUTES.NOT_LOGGED_IN);
    }
  }, [signedIn, router.pathname]);

  return (
    <>
      <header className="mx-nav relative z-50 mt-8 flex items-center justify-between lg:mt-12">
        <Logo classes="w-11.5 lg:w-13.5" />
        <nav className="hidden gap-12 font-semibold text-white lg:flex">
          {routes.map((item, index) => (
            <DropdownNavbarTitle key={index} item={item} />
          ))}
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

        {/* ========= Login/Signup ========= */}

        <div className="hidden lg:flex lg:gap-4">
          {!signedIn ? (
            <>
              <GradientBorder rounded="rounded-lg">
                <Button
                  type="button"
                  hierarchy="secondary"
                  font="font-bold"
                  rounded="rounded-[15px]"
                  classes="lg:block"
                  onClick={() => {
                    dispatch(signInMoveUp());
                  }}
                >
                  Log in
                </Button>
              </GradientBorder>
              <Button
                type="button"
                hierarchy="primary"
                font="font-bold"
                rounded="rounded-md"
                classes="lg:block"
                onClick={() => {
                  dispatch(signUpMoveUp());
                }}
              >
                Join Us
              </Button>
            </>
          ) : (
            <>
              <p className="text-s p-2 text-grey3">
                Logged in as <b>{signedIn}</b>
              </p>
              <GradientBorder rounded="rounded-lg">
                <Button
                  type="button"
                  hierarchy="secondary"
                  font="font-bold"
                  rounded="rounded-[15px]"
                  classes="lg:block"
                  onClick={() => {
                    dispatch(logout());
                  }}
                >
                  Log out
                </Button>
              </GradientBorder>
            </>
          )}
        </div>
      </header>
      <div
        className={`transition-300 fixed inset-0 z-40 bg-black lg:hidden ${
          isMobileMenuOpen ? "" : "translate-x-full"
        }`}
      >
        <div className="bg-gradient pointer-events-none absolute inset-0 opacity-10" />
        <nav className="mx-container mt-36 grid h-[calc(100vh-15rem)] overflow-y-auto">
          <hr className="mb-4 border-t-2 border-white" />
          {routes.map((item, index) => {
            return <DropdownNavbarTitleCollapse key={index} item={item} />;
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
