import type { AppProps } from "next/app";
import { useRouter } from "next/router";

import ReduxProvider from "@/components/redux/ReduxProvider";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import SignUp from "@/components/sections/home/SignUp";
import SignIn from "@/components/sections/home/SignIn";

import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  // Very bad not good but will work for now, pls fix
  const router = useRouter();
  const hideLayoutRoutes = [
    "/account/verification",
    "/account/resetPassword",
    "/sandbox/input",
  ];
  const shouldHideLayout = hideLayoutRoutes.includes(router.pathname);
  return (
    <ReduxProvider>
      {!shouldHideLayout && <Navbar />}
      {!shouldHideLayout && <SignUp />}
      {!shouldHideLayout && <SignIn />}
      <Component {...pageProps} />
      {!shouldHideLayout && <Footer />}
    </ReduxProvider>
  );
}
