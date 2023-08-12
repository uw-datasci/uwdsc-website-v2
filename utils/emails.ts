import axios from "axios";

export const sendContactEmail = async (values: Record<string, string>) => {
  await axios.post("/api/send/contact", values);
};

export const sendSponsorEmail = async (values: Record<string, string>) => {
  await axios.post("/api/send/sponsor", values);
};
