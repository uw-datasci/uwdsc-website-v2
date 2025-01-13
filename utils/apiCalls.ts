import { RootState } from "@/store/store";
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
    return await axios.post("/api/UWDSC/user/sendVerificationEmail", {
      email: response.data.email,
    });
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

export const getQrCode = async () => {
  return await axios.post("/api/UWDSC/user/getQrPayload", {
    token: store.getState().loginToken.token,
  });
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
  checkInById?: boolean,
  selected?: boolean,
  additionalFields?: Record<string, any>,
) => {
  return await axios.post("/api/UWDSC/admin/patchRegistrantById", {
    token: store.getState().loginToken.token,
    checkInById,
    selected,
    additionalFields,
  });
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
