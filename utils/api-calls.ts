import axios from "axios";
import { promises } from "dns";

export const sendContactEmail = async (values: Record<string, string>) => {
  await axios.post("/api/send/contact", values);
};

export const sendSponsorEmail = async (values: Record<string, string>) => {
  await axios.post("/api/send/sponsor", values);
};

export const sendSignUpInfo = async (values: Record<string, string>) => {
  await axios.post("/api/send/sign-up", values);
};

export const sendSignInInfo = async (values: Record<string, string>) => {
  try {
    const response = await axios.post("/api/send/sign-in", values);
    return response;
  } catch (error) {
    throw error;
  }
};

export const sendVerificationInfo = async (values: Record<string, string>) => {
  try {
    const response = await axios.post("/api/send/verify-user", values);
    return response;
  } catch (error) {
    throw error;
  }
};

export const sendForgotPassRequest = async (values: Record<string, string>) => {
  try {
    const response = await axios.post("/api/send/forgot-pass", values);
    return response;
  } catch (error) {
    throw error;
  }
};

export const sendResetPassRequest = async (values: Record<string, string>) => {
  try {
    const response = await axios.post("/api/send/reset-pass", values);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getQrCode = async (values: Record<string, string>) => {
  try {
    const response = await axios.post("/api/send/qr-code", values);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getUserbyId = async (values: Record<string, string>) => {
  try {
    const response = await axios.post(`/api/send/get-user`, values);
    return response;
  } catch (error) {
    throw error;
  }
};

export const checkInById = async (values: Record<string, string>) => {
  try {
    const response = await axios.post(`/api/send/check-in`, values);
    return response;
  } catch (error) {
    throw error;
  }
};
