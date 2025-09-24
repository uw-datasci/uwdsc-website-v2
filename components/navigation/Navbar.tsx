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
  className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-6 lg:px-12 lg:py-8 
  ${isMobileMenuOpen ? "hidden lg:flex" : ""}`}
>
        {/* logo */}
        <Logo classes="w-12 lg:w-14" />

        {/* centered pill */}
        <nav
          className="hidden lg:flex gap-12 font-semibold text-white 
          px-12 py-4 rounded-full 
          backdrop-blur-md bg-white/10 border border-white/30 shadow-lg"
        >
          {routes.map((item, index) => (
            <DropdownNavbarTitle key={index} item={item} />
          ))}
        </nav>

        {/* login/logout */}
        <div className="hidden lg:flex items-center gap-8 text-white">
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
            <button
              onClick={() => {
                dispatch(logout());
                router.push("/");
              }}
              className="text-sm hover:underline"
            >
              ( Log Out )
            </button>
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
        className={`transition-transform duration-300 fixed inset-0 z-40 overflow-y-auto 
        backdrop-blur-md bg-black/70 lg:hidden
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

        <nav className="px-6 py-6 grid gap-4 text-white">
          {routes.map((item, index) => (
            <DropdownNavbarTitleCollapse key={index} item={item} />
          ))}
        </nav>
      </div>
    </>
  );
}
