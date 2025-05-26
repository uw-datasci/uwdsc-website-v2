import { RootState, AppDispatch } from "@/store/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MemCard from "@/components/cards/memCard";
import {
  getCurrentUser,
  getLatestEvent,
  getCurrentUserRegistrationByID,
  patchCheckInRegistrantById,
} from "@/utils/apiCalls";
import { setLatestEvent, setRegistrationStatus } from "@/store/slices/latestEventSlice";

interface UserInfo {
  username: string;
  email: string;
  faculty: string;
  hasPaid: boolean;
  isCheckedIn: boolean;
}

interface Event {
  id: string;
  name: string;
}

export default function MemCheckIn() {
  const dispatch = useDispatch<AppDispatch>();
  const userToken = useSelector((state: RootState) => state.loginToken.token);
  const { event: latestEvent, isRegistered, isCheckedIn } = useSelector((state: RootState) => state.latestEvent);
  
  const getUserId = () => {
    if (!userToken) return null;
    try {
      return JSON.parse(atob(userToken.split(".")[1])).user.id;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };
  
  const userId = getUserId();

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [time, setTime] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!userToken || !userId) {
          throw new Error("User is not registered.");
        }
        const response = await getCurrentUser();
        setUserInfo(response.data.user);
      } catch (err: any) {
        console.error(err);
      }
    };

    fetchUserData();
  }, [userToken, userId]);

  // fetch latest event
  useEffect(() => {
    const fetchLatestEvent = async () => {
      try {
        const response = await getLatestEvent();
        if (response.data.event) {
          dispatch(setLatestEvent(response.data.event));
        }
      } catch (err: any) {
        console.error("Error fetching latest event:", err);
      }
    };

    fetchLatestEvent();
  }, [dispatch]);

  // fetch registrant from event
  useEffect(() => {
    const getRegistrant = async () => {
      if (!latestEvent || !userId) {
        return;
      }
      
      try {
        const response = await getCurrentUserRegistrationByID();
        console.log("Registration response:", response.data);
        // Check if the user is registered for the current event
        const isRegistered = response.data.exist;
        dispatch(setRegistrationStatus({
          isRegistered,
          isCheckedIn: isRegistered ? response.data.checkedIn : false
        }));
      } catch (err) {
        console.error("Error fetching check-in status:", err);
        dispatch(setRegistrationStatus({ isRegistered: false, isCheckedIn: false }));
      } finally {
        setLoading(false);
      }
    };
    getRegistrant();
  }, [latestEvent, userId, dispatch]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString("en-US", { hour12: false });
      setTime(formattedTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCheckIn = async () => {
    if (!latestEvent || !userId) return;
    
    try {
      const response = await patchCheckInRegistrantById(latestEvent.id, userId, "");
      if (response.data.updatedRegistrant) {
        dispatch(setRegistrationStatus({ isRegistered: true, isCheckedIn: true }));
      }
    } catch (err) {
      console.error("Error checking in:", err);
    }
  }

  if (!userInfo) {
    return null;
  }
  if (loading) {
    return null;
  }
  return (
    <MemCard userInfo={userInfo} checkedIn={checkedIn} selectedEvent={selectedEvent} onCheckIn={handleCheckIn}/>
  );
}
