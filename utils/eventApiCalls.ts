import axios from "axios";
import store from "../store/store";

//Other
export const sendSponsorEmail = async (values: Record<string, string>) => {
  await axios.post("/api/other/sponsor", values);
};

//Events
export const getEvents = async (
  fromDate?: Date,
  upToDate?: Date,
  buffered: boolean = false,
) => {
  return await axios.post("/api/UWDSC/public/getEvents", {
    fromDate,
    upToDate,
    buffered,
  });
};

export const patchCheckInRegistrantByIdUser = async (
  eventId: string,
  userId: string,
) => {
  return await axios.patch(
    `/api/UWDSC/events/${eventId}/registrants/checkin/${userId}`,
    {
      token: store.getState().loginToken.token,
    },
  );
};

export const patchCheckInRegistrantById = async ( //Not sure where this maps to
  eventId: string,
  userId: string,
  eventSecret: string,
) => {
  return await axios.patch(
    `/api/UWDSC/events/${eventId}/registrants/checkin/${userId}`,
    {
      token: store.getState().loginToken.token,
      eventSecret,
    },
  );
};

export const getLatestEvent = async () => {
  return await axios.post("/api/UWDSC/events/latest", {
    token: store.getState().loginToken.token,
  });
};

export const getAllFutureEvents = async () => {
  return await axios.post("/api/UWDSC/events/future", {
    token: store.getState().loginToken.token,
  });
};

export const getEventById = async (eventId: string) => {
  return await axios.get("/api/UWDSC/events/getEventById", {
    params: { eventId },
  });
};
