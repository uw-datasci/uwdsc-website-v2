import axios from "axios";
import { promises } from "dns";

export const sendContactEmail = async (values: Record<string, string>) => {
  await axios.post("/api/utils/contact", values);
};

export const sendSponsorEmail = async (values: Record<string, string>) => {
  await axios.post("/api/utils/sponsor", values);
};

export const sendSignUpInfo = async (values: Record<string, string>) => {
  await axios.post("/api/user/sign-up", values);
};

export const sendSignInInfo = async (values: Record<string, string>) => {
  try {
    const response = await axios.post("/api/user/sign-in", values);
    return response;
  } catch (error) {
    throw error;
  }
};

export const sendVerificationInfo = async (values: Record<string, string>) => {
  try {
    const response = await axios.post("/api/user/verify-user", values);
    return response;
  } catch (error) {
    throw error;
  }
};

export const sendForgotPassRequest = async (values: Record<string, string>) => {
  try {
    const response = await axios.post("/api/user/forgot-pass", values);
    return response;
  } catch (error) {
    throw error;
  }
};

export const sendResetPassRequest = async (values: Record<string, string>) => {
  try {
    const response = await axios.post("/api/user/reset-pass", values);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getQrCode = async (values: Record<string, string>) => {
  try {
    const response = await axios.post("/api/user/qr-code", values);
    return response;
  } catch (error) {
    throw error;
  }
};

export const resendVerification = async (values: Record<string, string>) => {
  try {
    const response = await axios.post("/api/user/verificationEmail", values);
    return response;
  } catch (error) {
    throw error;
  }
}

export const getUserbyId = async (values: Record<string, string>) => {
  try {
    const response = await axios.post(`/api/admin/get-user`, values);
    return response;
  } catch (error) {
    throw error;
  }
};

export const checkInById = async (values: Record<string, string>) => {
  try {
    const response = await axios.post(`/api/admin/check-in`, values);
    return response;
  } catch (error) {
    throw error;
  }
};