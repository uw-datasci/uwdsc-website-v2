import { RootState } from "@/store/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { useRouter } from "next/router";

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const token = useSelector((state: RootState) => state.loginToken.token);
    const isAdmin = useSelector((state: RootState) => state.loginToken.isAdmin);
    const router = useRouter();

    useEffect(() => {
      if (!token || !isAdmin) {
        console.log("Is admin: " + isAdmin.toString());
        router.push("/");
      }
    }, []);

    if (!token || !isAdmin) {
      return null;
    }

    return <Component {...props} />;
  };
}
