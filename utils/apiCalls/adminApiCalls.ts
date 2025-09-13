import axios from "axios";
import store from "../../store/store";

//Admin
export const fetchUsers = async (values: Record<string, string>) => {
  return await axios.post("/api/UWDSC/admin/getAllUsers", values);
};

export const createUser = async (values: Record<string, any>) => {
  return await axios.post("/api/UWDSC/admin/createUser", values);
};

export const editUser = async (values: Record<string, any>) => {
  return await axios.post("/api/UWDSC/admin/patchUserById", values);
};

export const deleteUser = async (values: Record<string, string>) => {
  return await axios.post("/api/UWDSC/admin/deleteUserById", values);
};

export const getUserbyId = async (values: Record<string, string>) => {
  return await axios.post("/api/UWDSC/admin/getUserById", values);
};

export const checkInById = async (values: Record<string, string>) => {
  return await axios.post("/api/UWDSC/admin/checkInUserById", values);
};

export const patchRegistrationByID = async (
  checkedIn?: boolean,
  selected?: boolean,
  additionalFields?: Record<string, any>,
) => {
  return await axios.post("/api/UWDSC/admin/patchRegistrantById", {
    token: store.getState().loginToken.token,
    checkedIn,
    selected,
    additionalFields,
  });
};

export const patchCheckInRegistrantToSubEventById = async (
  eventId: string,
  subEventId: string,
  userId: string,
  eventSecret: string,
) => {
  return await axios.post(
    "/api/UWDSC/admin/patchCheckInRegistrantToSubEventById",
    {
      token: store.getState().loginToken.token,
      eventId,
      subEventId,
      userId,
      eventSecret,
    },
  );
};

export const getRegistrationByID = async (eventId: string, userId: string) => {
  try {
    return await axios.post("/api/UWDSC/admin/getRegistrantById", {
      token: store.getState().loginToken.token,
      eventId,
      userId,
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const createEvent = async (event: Record<string, any>) => {
  return await axios.post("/api/UWDSC/admin/createEvent", {
    token: store.getState().loginToken.token,
    event,
  });
};

export const editEvent = async (
  id: string,
  changedFields: Record<string, any>,
) => {
  return await axios.post(`/api/UWDSC/admin/editEvent?id=${id}`, {
    token: store.getState().loginToken.token,
    event: changedFields,
  });
};

export const deleteEvent = async (id: string) => {
  return await axios.post(`/api/UWDSC/admin/deleteEvent?id=${id}`, {
    token: store.getState().loginToken.token,
  });
};

export const backfillUserEvents = async (userId: string) => {
  return await axios.post("/api/UWDSC/admin/backfillUserEvents", {
    token: store.getState().loginToken.token,
    userId,
  });
};

export const removeUserFromEvents = async (userId: string) => {
  return await axios.post("/api/UWDSC/admin/removeUserFromEvents", {
    token: store.getState().loginToken.token,
    userId,
  });
};

export const getAllTerms = async () => {
  return await axios.get("/api/UWDSC/admin/getAllTerms", {
    headers: {
      Authorization: `Bearer ${store.getState().loginToken.token}`,
    },
  });
};

export const getAllAppsByTerm = async (termId: string) => {
  return await axios.get("/api/UWDSC/admin/getAllAppsByTerm", {
    headers: {
      Authorization: `Bearer ${store.getState().loginToken.token}`,
    },
    params: { termId },
  });
};

export const getAllApplications = async () => {
  return await axios.get("/api/UWDSC/admin/getAllApplications", {
    headers: {
      Authorization: `Bearer ${store.getState().loginToken.token}`,
    },
  });
};