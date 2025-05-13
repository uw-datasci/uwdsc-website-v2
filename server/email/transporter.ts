import nodemailer from "nodemailer";
import { env } from "@/env/server";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.google.com",
  port: 465,
  secure: true,
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_APPLICATION_PASSWORD,
  },
});
