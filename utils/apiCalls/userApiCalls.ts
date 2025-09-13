import axios from "axios";
import store from "../../store/store";

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

export const getCurrentUser = async () => {
  return await axios.post("/api/UWDSC/user/getCurrentUser", {
    token: store.getState().loginToken.token,
  });
};