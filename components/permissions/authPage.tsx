import { RootState } from "@/store/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { useRouter } from "next/router";

export default function authPage(Component: any, allowedRoles: string[]) {
  return function authPage(props: any) {
    const token = useSelector((state: RootState) => state.loginToken.token);
    const role = useSelector((state: RootState) => state.loginToken.role);
    const router = useRouter();

    useEffect(() => {
      if (!token || !allowedRoles.includes(role)) {
        router.push("/unauthorized");
      }
    }, []);

    if (!token || !allowedRoles.includes(role)) {
      return null;
    }

    return <Component {...props} />;
  };
}
