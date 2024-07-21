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
}
