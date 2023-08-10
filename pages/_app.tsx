import type { AppProps } from "next/app";

import ReduxProvider from "@/components/redux/ReduxProvider";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";

import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </ReduxProvider>
  );
}
