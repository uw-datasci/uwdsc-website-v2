import { RootState } from "@/store/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Role } from "@/constants/roles";

interface AuthPageProps {
  allowedRoles: string[];
}

export default function withAuth<T>(
  WrappedComponent: React.ComponentType<T>,
  allowedRoles: (Role | "")[],
) {
  const AuthPage: React.FC<T & AuthPageProps> = (props) => {
    const userToken = useSelector((state: RootState) => state.loginToken.token);
    const userRole = useSelector((state: RootState) => state.loginToken.role);
    const router = useRouter();

    useEffect(() => {
      if (!userToken || !allowedRoles.includes(userRole)) {
        router.push("/unauthorized");
      }
    }, [userToken, userRole]);

    // Prevent rendering if unauthorized
    if (!userToken || !allowedRoles.includes(userRole)) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthPage;
}
