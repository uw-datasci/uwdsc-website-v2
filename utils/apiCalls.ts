import axios from "axios";
import { promises } from "dns";


//Other
export const sendContactEmail = async (values: Record<string, string>) => {
  return await axios.post("/api/other/contact", values);
};

export const sendSponsorEmail = async (values: Record<string, string>) => {
  return await axios.post("/api/other/sponsor", values);
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
  console.log("test")
  const response =  await axios.post("/api/UWDSC/user/registerUser", values); 
  return await axios.post("/api/UWDSC/user/sendVerificationEmail", {email: response.data.email});
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

export const getQrCode = async (values: Record<string, string>) => {
  return await axios.post("/api/UWDSC/user/getQrPayload", values);
};

export const sendForgotPassRequest = async (values: Record<string, string>) => {
  return await axios.post("/api/UWDSC/user/sendForgotPasswordEmail", values);
};

export const resendVerification = async (values: Record<string, string>) => {
  return await axios.post("/api/UWDSC/user/sendVerificationEmail", values);
};
