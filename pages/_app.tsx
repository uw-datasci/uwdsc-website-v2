import type { AppProps } from "next/app";
import { useRouter } from "next/router";

import ReduxProvider from "@/components/redux/ReduxProvider";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import SignUp from "@/components/popup/SignUp";
import SignIn from "@/components/popup/SignIn";
import MembershipBanner from "@/components/layout/MembershipBanner";
import { Analytics } from "@vercel/analytics/react";

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
      {!shouldHideLayout && <MembershipBanner />}
      {!shouldHideLayout && <SignUp />}
      {!shouldHideLayout && <SignIn />}
      <Component {...pageProps} />
      {!shouldHideLayout && <Footer />}
      <Analytics />
    </ReduxProvider>
  );
}
