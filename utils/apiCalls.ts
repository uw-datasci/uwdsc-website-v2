import axios from "axios";
import store from "../store/store";

//Other
export const sendContactEmail = async (values: Record<string, string>) => {
  await axios.post("/api/other/contact", values);
};

export const sendSponsorEmail = async (values: Record<string, string>) => {
  await axios.post("/api/other/sponsor", values);
};

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

//User
export const sendSignUpInfo = async (values: Record<string, string>) => {
  try {
    const response = await axios.post("/api/UWDSC/user/registerUser", values);
    // return await axios.post("/api/UWDSC/user/sendVerificationEmail", {
    //   email: response.data.email,
    // });
    // return await axios.post("/api/UWDSC/user/registerUser", values);
  } catch (err: any) {
    const response = err.response.data;
    if (
      response.customErrorMessage &&
      response.error.message ==
        "The email you used is already a member, but we'll send you another verification email."
    ) {
      await axios.post("/api/UWDSC/user/sendVerificationEmail", {
        email: values.email,
      });
    }
    throw err;
  }
};

export const sendSignInInfo = async (values: Record<string, string>) => {
  return await axios.post("/api/UWDSC/user/login", values);
};

export const sendVerificationInfo = async (values: Record<string, string>) => {
  return await axios.post("/api/UWDSC/user/verifyUser", values);
};

export const sendResetPassRequest = async (values: Record<string, string>) => {
  return await axios.post("/api/UWDSC/user/resetPassword", values);
};

export const sendForgotPassRequest = async (values: Record<string, string>) => {
  return await axios.post("/api/UWDSC/user/sendForgotPasswordEmail", values);
};

export const resendVerification = async (values: Record<string, string>) => {
  return await axios.post("/api/UWDSC/user/sendVerificationEmail", values);
};

export const getCurrentUserRegistrationByID = async () => {
  return await axios.post("/api/UWDSC/user/getEventRegistrationById", {
    token: store.getState().loginToken.token,
  });
};

export const attachCurrentUserRegistrationByID = async (
  additionalFields: Record<string, any>,
) => {
  return await axios.post("/api/UWDSC/user/attachEventRegistrationById", {
    token: store.getState().loginToken.token,
    additionalFields,
  });
};

export const patchCurrentUserRegistrationByID = async (
  additionalFields: Record<string, any>,
) => {
  return await axios.post("/api/UWDSC/user/patchEventRegistrationById", {
    token: store.getState().loginToken.token,
    additionalFields,
  });
};

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
export const patchCheckInRegistrantById = async (
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

export const getCurrentUser = async () => {
  return await axios.post("/api/UWDSC/user/getCurrentUser", {
    token: store.getState().loginToken.token,
  });
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

export const getCurrentTerm = async () => {
  return await axios.get("/api/UWDSC/applications/currentTerm");
};

export const createOrUpdateApplication = async (
  applicationData: Record<string, any>,
) => {
  return await axios.post("/api/UWDSC/applications/save", {
    token: store.getState().loginToken.token,
    ...applicationData,
  });
};

export const getCurrentUserApplication = async () => {
  return await axios.post("/api/UWDSC/applications/user", {
    token: store.getState().loginToken.token,
  });
};
