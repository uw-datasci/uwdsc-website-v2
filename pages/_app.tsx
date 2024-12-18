import type { AppProps } from "next/app";

import ReduxProvider from "@/components/redux/ReduxProvider";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import SignUp from "@/components/sections/home/SignUp";
import SignIn from "@/components/sections/home/SignIn";

import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider>
      <Navbar />
      <SignUp/>
      <SignIn/>
      <Component {...pageProps} />
      <Footer />
    </ReduxProvider>
  );
}
