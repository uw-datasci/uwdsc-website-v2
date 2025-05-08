import {
  facultyOptions,
  paymentMethodOptions,
  tokenPurposeOptions,
} from "@/constants/member";
import { roleOptions } from "@/constants/roles";
import z from "zod";

export const MemberTypeSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
  userStatus: z.enum(roleOptions),
  hasPaid: z.boolean(),
  watIAM: z.string().optional(),
  faculty: z.enum(facultyOptions),
  term: z.string(),
  heardFromWhere: z.string(),
  paymentMethod: z.enum(paymentMethodOptions).optional(),
  paymentLocation: z.string().optional(),
  verifier: z.string().optional(),
  isEmailVerified: z.boolean(),
  memberIdeas: z.string().optional(),
  token: z.object({
    hash: z.string(),
    expires: z.date(),
    purpose: z.enum(tokenPurposeOptions),
  }),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Member = z.infer<typeof MemberTypeSchema>;
