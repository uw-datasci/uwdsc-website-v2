import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MemCard from "@/components/cards/memCard";
import { getCurrentUser } from "@/utils/apiCalls";
import LoadingSpinner from "@/components/UI/LoadingSpinner";

interface UserInfo {
  username: string;
  email: string;
  faculty: string;
  hasPaid: boolean;
  isCheckedIn: boolean;
}

export default function MemCheckIn() {
  const userToken = useSelector((state: RootState) => state.loginToken.token);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!userToken) {
          throw new Error("User is not registered.");
        }
        const response = await getCurrentUser();
        setUserInfo(response.data.user);
      } catch (err: any) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userToken]);

  if (!userInfo || loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div className="my-10">
      <MemCard userInfo={userInfo} />;
    </div>
  );
}
