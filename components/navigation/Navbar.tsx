import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { moveUp as signUpMoveUp } from "@/store/slices/signUpPageSlice";
import { moveUp as signInMoveUp } from "@/store/slices/signInPageSlice";
import { RootState } from "@/store/store";

import Link from "next/link";
import { Instagram, Linkedin, Mail, Youtube } from "react-feather";

import Button from "@/components/UI/Button";
import GradientBorder from "@/components/UI/GradientBorder";
import Logo from "@/components/UI/Logo";
import { logout } from "@/store/slices/loginTokenSlice";

type nav_obj = {
  label: string;
  route: string;
}

const DEFAULT_ROUTES = [
  {
    label: "Home",
    route: "/",
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
  let dispatch = useDispatch();
  const [routes, setRoutes] = useState<nav_obj[]>(DEFAULT_ROUTES);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const signedIn = useSelector((state: RootState) => state.loginToken.id);
  const router = useRouter();

  useEffect(() => {
    if (signedIn && routes.length == 4) {
      setRoutes(routes.concat(
        {
          label: "QR Code",
          route: "/qrPage",
        })
      )
    } 
    
    if (!signedIn && routes.length == 5){
      setRoutes(routes.filter((nav) => {return nav.label != "QR Code"}))
    }

    if ((router.pathname === "/admin" || router.pathname === "/qrScanner") &&  !routes.some((nav) => nav.label ==="QR Scanner")){
      setRoutes(routes.concat({
        label: "QR Scanner",
        route: "/qrScanner",
      })
    );
    }

    if(router.pathname !== "/admin" &&  routes.some((nav) => nav.label ==="QR Scanner")){
      setRoutes(
      routes.filter((nav) => {return nav.label != "QR Scanner"})
    );
    }
    console.log(routes);
  }, [signedIn, router.pathname]); 

  return (
    <>
      <header className="mx-nav relative z-50 mt-8 flex items-center justify-between lg:mt-12">
        <Logo classes="w-11.5 lg:w-13.5"/>
        <nav className="hidden gap-16 lg:flex">
          {routes.map((route) => {
            return (
              <Link
                href={route.route}
                className="font-semibold text-white"
                key={route.label}
              >
                {route.label}
              </Link>
            );
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

{/* ========= Login/Signup ========= */}

        <div className="hidden lg:flex lg:gap-4">
        {!signedIn ? 
          <>
            <GradientBorder rounded="rounded-lg">
              <Button
                type="button"
                hierarchy="secondary"
                font="font-bold"
                rounded="rounded-[15px]"
                classes="lg:block"
                onClick={() => { dispatch(signInMoveUp()) }}
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
              onClick={() => { dispatch(signUpMoveUp()) }}
            >
              Join Us
            </Button>
          </>
        :
          <>
            <p className="text-s text-grey3 p-2">Logged in as <b>{signedIn}</b></p>
            <GradientBorder rounded="rounded-lg">
              <Button
                type="button"
                hierarchy="secondary"
                font="font-bold"
                rounded="rounded-[15px]"
                classes="lg:block"
                onClick={() => { dispatch(logout()) }}
              >
                Log out
              </Button>
            </GradientBorder>
          </>
        }
        </div>


      </header>
      <div
        className={`transition-300 fixed inset-0 z-40 bg-black lg:hidden ${
          isMobileMenuOpen ? "" : "translate-x-full"
        }`}
      >
        <div className="bg-gradient pointer-events-none absolute inset-0 opacity-10" />
        <nav className="mx-container mt-36 grid gap-8">
          {routes.map((route) => {
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
