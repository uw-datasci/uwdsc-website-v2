import { RootState } from "@/store/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Clock } from "lucide-react"
// import { Button } from "@/components/UI/Button"

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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!userToken) {
          throw new Error("User is not registered.");
        }
        // retrieve id from token - theres library that does this but this is manual way
        // npm i jwt-decode to decode jwt token for id
        const userId = JSON.parse(atob(userToken.split(".")[1])).user.id;

        const response = await axios.post("/api/UWDSC/admin/getUserById", {
          id: userId,
          token: userToken,
        });

        if (response.data.success) {
          setUserInfo(response.data);
        } else {
          throw new Error("Falied fetch");
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userToken]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userInfo) {
    return null;
  }

  return (
    (!userInfo.hasPaid ? 
    (<div className="my-10 w-[30%] break-words rounded-xl border-2 border-white p-5 text-white">
      <h1 className="mb-5">Membership Card</h1>
      <div>
        <p>
          <span className="font-bold">Username: </span>
          {userInfo.username}
        </p>
        <p>
          <span className="font-bold">Email: </span>
          {userInfo.email}
        </p>
        <p>
          <span className="font-bold">Faculty: </span>
          {userInfo.faculty}
        </p>
        <p>
          <span className="font-bold">Paid: </span>
          {userInfo.hasPaid ? "Yes" : "No"}
        </p>
        <p>
          <span className="font-bold">Checked In: </span>
          {userInfo.isCheckedIn ? "Yes" : "No"}
        </p>
      </div>
    </div>) :
    (!userInfo.isCheckedIn ? 
      (<div className="w-full max-w-md mx-auto bg-gradient-to-b from-[#acc2ff] via-[#b7c7ff] to-[#c6d2ff] rounded-3xl overflow-hidden shadow-2xl">
      {/* Status Header */}
      <div className="bg-[#f59e0c] px-6 py-4 flex items-center justify-center gap-3">
        <Clock className="w-6 h-6 text-white" />
        <span className="text-white text-xl font-semibold">Not Checked-In</span>
      </div>

      {/* Main Card Content */}
      <div className="px-6 py-8">
        {/* Header with Avatar and Title */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-[#959595] rounded-full"></div>
          <div>
            <h1 className="text-white text-3xl font-bold">UW Data Science</h1>
            <p className="text-[#b7b7b7] text-lg">Term Membership Card</p>
          </div>
        </div>

        {/* Member Information Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8">
          <p className="text-[#b7b7b7] text-sm mb-2">Member</p>
          <h2 className="text-white text-2xl font-bold mb-6">Jia Huang</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[#b7b7b7] text-sm mb-1">Current Time</p>
              <p className="text-white text-xl font-bold">XX:XX:XX</p>
            </div>
            <div>
              <p className="text-[#b7b7b7] text-sm mb-1">MathSoc Member</p>
              <p className="text-white text-xl font-bold">Yes</p>
            </div>
          </div>
        </div>

        {/* Event Information and Check-in */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[#b7b7b7] text-sm mb-1">Event Check-in</p>
            <h3 className="text-white text-xl font-semibold leading-tight">Upper Year Co-op Panel</h3>
          </div>
          {/* <Button className="bg-[#f59e0c] hover:bg-[#e8890b] text-white px-8 py-3 rounded-2xl text-lg font-semibold shadow-lg">
            Check-In
          </Button> */}
        </div>
      </div>
    </div>) :
    (<div className="my-10 w-[30%] break-words rounded-xl border-2 border-white p-5 text-white">
      <h1 className="mb-5">Membership Card</h1>
      <div>
        <p>
          <span className="font-bold">Username: </span>
          {userInfo.username}
        </p>
        <p>
          <span className="font-bold">Email: </span>
          {userInfo.email}
        </p>
        <p>
          <span className="font-bold">Faculty: </span>
          {userInfo.faculty}
        </p>
        <p>
          <span className="font-bold">Paid: </span>
          {userInfo.hasPaid ? "Yes" : "No"}
        </p>
        <p>
          <span className="font-bold">Checked In: </span>
          {userInfo.isCheckedIn ? "Yes" : "No"}
        </p>
      </div>
    </div>)))
  );
}
