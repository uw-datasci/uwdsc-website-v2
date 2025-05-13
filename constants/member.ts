import z from "zod";
import { roleOptions } from "./roles";
import { zObjectId } from "@/server/db/schemas/util";

export const facultyOptions = [
  "Math",
  "Engineering",
  "Science",
  "Arts",
  "Health",
  "Environment",
  "Other/Non-waterloo",
] as const;

export type Faculty = (typeof facultyOptions)[number];

export const paymentMethodOptions = ["Cash", "Online", "MathSoc"] as const;

export type PaymentMethod = (typeof paymentMethodOptions)[number];

export const termOptions = [
  "1A",
  "1B",
  "2A",
  "2B",
  "3A",
  "3B",
  "4A",
  "4B",
  "Masters",
  "PHD",
  "Other/Non-waterloo",
] as const;

export type Term = (typeof termOptions)[number];

export const tokenPurposeOptions = [
  "",
  "Verification",
  "Reset Password",
] as const;

export type TokenPurpose = (typeof tokenPurposeOptions)[number];

export const ClientTokenTypeSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  id: z.string(),
  role: z.enum(roleOptions),
});

export type ClientToken = z.infer<typeof ClientTokenTypeSchema>;

export const QRPayloadTypeSchema = z.array(
  z.object({
    id: zObjectId,
    eventSecret: z.string().min(1),
  }).strict(),
);

export type QRPayload = z.infer<typeof QRPayloadTypeSchema>;
