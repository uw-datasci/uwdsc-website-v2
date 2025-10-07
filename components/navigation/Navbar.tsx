import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { displaySignUp } from "@/store/slices/signUpPageSlice";
import { displaySignIn } from "@/store/slices/signInPageSlice";
import { RootState } from "@/store/store";

import Logo from "@/components/UI/Logo";
import { logout } from "@/store/slices/loginTokenSlice";
import DropdownNavbarTitle from "./DropdownNavbarTitle";
import { NAVBAR_ROUTES } from "./navbarPermissions";
import DropdownNavbarTitleCollapse from "./DropdownNavbarTitleCollapse";

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
      } else if (userRole === "exec") {
        setRoutes(NAVBAR_ROUTES.EXEC);
      } else {
        setRoutes(NAVBAR_ROUTES.USER);
      }
    } else {
      setRoutes(NAVBAR_ROUTES.NOT_LOGGED_IN);
    }
  }, [signedIn, router.pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* glass navbar */}
      <header
        className={`fixed left-0 top-0 z-50 flex w-full items-center justify-between px-6 py-6 lg:px-12 lg:py-8 
  ${isMobileMenuOpen ? "hidden lg:flex" : ""}`}
      >
        {/* logo */}
        <Logo classes="w-12 lg:w-14" />

        {/* centered pill */}
        <nav
          className="hidden gap-12 rounded-full border border-white/30 bg-white/10 px-8
          py-2 font-semibold text-white shadow-lg backdrop-blur-md 
          lg:flex lg:items-center lg:text-center xl:px-10 xl:py-4"
        >
          {routes.map((item, index) => (
            <DropdownNavbarTitle key={index} item={item} />
          ))}
        </nav>

        {/* login/logout */}
        <div className="hidden items-center gap-6 text-white lg:flex">
          {!signedIn ? (
            <>
              <button
                onClick={() => dispatch(displaySignIn())}
                className="text-sm hover:underline"
              >
                ( Log in )
              </button>
              <button
                onClick={() => dispatch(displaySignUp())}
                className="text-sm hover:underline"
              >
                ( Join Us )
              </button>
            </>
          ) : (
            <>
              <p className="text-s p-2 text-grey2">
                Logged in as <b>{signedIn}</b>
              </p>
              <button
                onClick={() => {
                  dispatch(logout());
                  router.push("/");
                }}
                className="text-sm hover:underline"
              >
                ( Log Out )
              </button>
            </>
          )}
        </div>

        {/* mobile menu toggle */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="flex flex-col gap-[5px] lg:hidden"
        >
          <div className="h-[3px] w-[22px] rounded-full bg-white" />
          <div className="h-[3px] w-8 rounded-full bg-white" />
          <div className="h-[3px] w-[22px] translate-x-[10px] rounded-full bg-white" />
        </button>
      </header>

      {/* mobile */}
      <div
        className={`fixed inset-0 z-40 overflow-y-auto bg-black/70 backdrop-blur-md 
        transition-transform duration-300 lg:hidden
        ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <header className="flex items-center justify-between px-6 py-4 lg:px-12 lg:py-6">
          <Logo classes="w-12 lg:w-14" />
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="flex flex-col gap-[5px]"
          >
            <div className="h-[3px] w-[22px] translate-x-[10px] rounded-full bg-white" />
            <div className="h-[3px] w-8 rounded-full bg-white" />
            <div className="h-[3px] w-[22px] rounded-full bg-white" />
          </button>
        </header>

        <nav className="grid gap-4 px-6 py-6 text-white">
          {routes.map((item, index) => (
            <DropdownNavbarTitleCollapse key={index} item={item} />
          ))}
        </nav>
      </div>
    </>
  );
}
