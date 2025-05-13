import {
  facultyOptions,
  paymentMethodOptions,
  termOptions,
  tokenPurposeOptions,
} from "@/constants/member";
import { roleOptions } from "@/constants/roles";
import z from "zod";
import { makeAllOptionalStrings, zObjectId } from "./util";

export const memberTypeSchema = z.object({
  _id: zObjectId.describe("[Member] Unique ID"),
  username: z.string().min(1).describe("[Member] Name"),
  email: z.string().min(1).describe("[Member] Unique email"),
  password: z.string().min(1).describe("[Member] Encrypted password"),
  role: z
    .enum(roleOptions)
    .describe("[Member] Role to determine access control"),
  hasPaid: z.boolean().describe("[Member] If a member has been marked as paid"),
  watIAM: z.string().min(1).optional().describe("[Member] Unique Waterloo ID"),
  faculty: z.enum(facultyOptions).describe("[Member] Faculty"),
  term: z
    .enum(termOptions)
    .describe("[Member] Academic term at time of creation"),
  heardFromWhere: z
    .string()
    .min(1)
    .describe("[Member] Where they heard of UWDSC"),
  paymentMethod: z
    .enum(paymentMethodOptions)
    .optional()
    .describe("[Member] How they paid"),
  paymentLocation: z
    .string()
    .min(1)
    .optional()
    .describe("[Member] Where they paid(Event name/Office)"),
  verifier: z
    .string()
    .min(1)
    .optional()
    .describe("[Member] Who is responsible for their payment"),
  isEmailVerified: z
    .boolean()
    .describe(
      "[Member] If their email is verifed(12/5/2025 - current disabled)",
    ),
  memberIdeas: z
    .string()
    .min(1)
    .optional()
    .describe("[Member] Potential ideas for the club"),
  token: z
    .object({
      hash: z.string().describe("[Member] Token hash"),
      expires: z.coerce.date().describe("[Member] Token expiry"),
      purpose: z.enum(tokenPurposeOptions).describe("[Member] Token purpose"),
    })
    .describe(
      "[Member] Token metadata for verification and forgot password flow",
    ),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Member = z.infer<typeof memberTypeSchema>;

export const memberDisplayTypeSchema = makeAllOptionalStrings(
  memberTypeSchema.omit({ token: true }),
);

export type DisplayMember = z.infer<typeof memberDisplayTypeSchema>;
