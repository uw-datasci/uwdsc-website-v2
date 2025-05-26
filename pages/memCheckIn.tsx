import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MemCard from "@/components/cards/memCard";
import {
  getCurrentUser,
  getEvents,
  getCurrentUserRegistrationByID,
  patchCheckInRegistrantById,
} from "@/utils/apiCalls";

interface UserInfo {
  username: string;
  email: string;
  faculty: string;
  hasPaid: boolean;
  isCheckedIn: boolean;
}

export default function MemCheckIn() {
  // retrieve id from token - theres library (npm i jwt-decode to decode jwt token for id)
  // that does this but this is manual way
  const userToken = useSelector((state: RootState) => state.loginToken.token);
  const userId = JSON.parse(atob(userToken.split(".")[1])).user.id;

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [time, setTime] = useState("");

  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [checkedIn, setCheckedIn] = useState(false);

  // fetch user data
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
      }
    };

    fetchUserData();
  }, []);

  // fetch current event
  useEffect(() => {
    const retrieveEvents = async () => {
      const response = await getEvents(
        new Date("2025-01-21"),
        new Date("2025-01-21"),
        true,
      );
      const events = response.data.events;
      if (!selectedEvent) {
        setSelectedEvent(events && events.length > 0 ? events[0] : null);
      }
    };
    retrieveEvents();
  }, []);

  // fetch registrant from event
  // combine w above
  useEffect(() => {
    const getRegistrant = async () => {
      if (selectedEvent) {
        try {
          const response = await getCurrentUserRegistrationByID();
          setCheckedIn(response.data.checkedIn);
        } catch (err) {
          console.error("Error fetching check-in status:", err);
        } finally {
          setLoading(false);
        }
      }
    };
    getRegistrant();
  }, [selectedEvent]);
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
    setCheckedIn(true);
    const response = await patchCheckInRegistrantById(
      selectedEvent.id,
      userId,
      "",
    );
    if (response.data.success) {
      console.log(response.data);
    } else if (response.status === 500) {
      console.log("Hi");
    }
  };
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
