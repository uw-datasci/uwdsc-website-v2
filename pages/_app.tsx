import type { AppProps, AppType } from "next/app";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";

import ReduxProvider from "@/components/redux/ReduxProvider";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import SignUp from "@/components/popup/SignUp";
import SignIn from "@/components/popup/SignIn";

import "@/styles/globals.css";

const UWDSC: AppType = ({ Component, pageProps }: AppProps) => {
  // Very bad not good but will work for now, pls fix
  const router = useRouter();
  const hideLayoutRoutes = [
    "/account/verification",
    "/account/resetPassword",
    "/sandbox/input",
  ];
  const hideFooterRoutes = ["/qrScanner", "/qrPage"];
  const shouldHideLayout = hideLayoutRoutes.includes(router.pathname);
  const shouldHideFooter = hideFooterRoutes.includes(router.pathname);
  return (
    <ReduxProvider>
      {!shouldHideLayout && <Navbar />}
      {!shouldHideLayout && <SignUp />}
      {!shouldHideLayout && <SignIn />}
      <Component {...pageProps} />
      {!shouldHideLayout && !shouldHideFooter && <Footer />}
    </ReduxProvider>
  );
};

export default trpc.withTRPC(UWDSC);
