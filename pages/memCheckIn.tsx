import { RootState } from "@/store/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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
