import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.google.com",
  port: 465,
  secure: true,
  auth: {
    user: "EMAIL ADDRESS (REPLACE WHEN RELIABLE ACCOUNT IS FOUND)",
    pass: "APPLICATION PASSWORD OF GOOGLE ACCOUNT (2FA REQUIRED)",
  },
});
