import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MemCard from "@/components/cards/MemCard";
import { getCurrentUser } from "@/utils/apiCalls/userApiCalls";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import EventPassport from "@/components/cards/EventPassport";
import SEO from "@/components/SEO/SEO";

export interface UserInfo {
  username: string;
  email: string;
  faculty: string;
  hasPaid: boolean;
  isMathSocMember: boolean;
  eventList: [];
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
    <>
    <SEO title="Check In" />
    <div className="mt-10">
      <div className="flex flex-col items-center px-5">
        <MemCard userInfo={userInfo} />;
        {userInfo.hasPaid && <EventPassport userInfo={userInfo} />}
      </div>
    </div>
    </>
  );
}
