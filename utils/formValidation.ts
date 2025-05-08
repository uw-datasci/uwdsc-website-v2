import { Field } from "formik";
import { z } from "zod";

require("dotenv").config();

let lastFileId = "";
let lastVerificationState = false;

function extractFileId(driveUrl: string) {
  const match =
    driveUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
    driveUrl.match(/id=([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

async function isPublicDriveFile(fileId: string) {
  try {
    if (lastFileId !== fileId && fileId) {
      console.log("Ran verification");
      const response = await fetch(`/api/other/google-drive?fileId=${fileId}`);
      lastFileId = fileId;
      lastVerificationState = response.ok;
      return response.ok;
    }
    return lastVerificationState;
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}

export const ContactFormSchema = z.object({
  name: z.string().nonempty("Please enter your name."),
  email: z
    .string()
    .email("Please enter a valid email.")
    .nonempty("Please enter your email."),
  purpose: z.string().nonempty("Please select the purpose of your contact."),
});

export const SponsorFormSchema = z.object({
  name: z.string().nonempty("Please enter your name."),
  email: z
    .string()
    .email("Please enter a valid email.")
    .nonempty("Please enter your work email."),
  company: z
    .string()
    .nonempty("Please enter your company or organization name."),
});

export const SignUpFormPart1Schema = z.object({
  name: z.string().nonempty("Please enter your name."),
  WatIAM: z.string().optional(),
  email: z
    .string()
    .email("Email must be valid.")
    .nonempty("Please enter your UWaterloo email."),
  password: z
    .string()
    .min(8, "Your password needs to be at least 8 characters long."),
});

export const SignUpFormPart2Schema = z.object({
  faculty: z.string().nonempty("Please select your faculty."),
  term: z.string().nonempty("Please select your current/last completed term."),
  advert: z.string().nonempty("Let us know where you heard about us!"),
});

export const SignInFormSchema = z.object({
  email: z
    .string()
    .nonempty("Please enter your email.")
    .email("Please enter a valid email."),
  password: z.string().nonempty("Please enter your password."),
});

export const ForgotPasswordFormSchema = z.object({
  email: z
    .string()
    .nonempty("Please enter the email associated with your account.")
    .email("Please enter a valid email."),
});

export const ResetPasswordFormSchema = z
  .object({
    newPass: z
      .string()
      .min(8, "Your password needs to be at least 8 characters long."),
    confirmPass: z.string().nonempty("Confirm Password is required."),
  })
  .refine((data) => data.confirmPass === data.newPass, {
    path: ["confirmPass"],
    message: "Passwords do not match.",
  });

export const CxCRegistrationSchema = z.object({
  firstName: z.string().nonempty("First name is required"),
  lastName: z.string().nonempty("Last name is required"),
  pronoun: z.string().nonempty("Please select your pronouns"),
  ethnicity: z.string().nonempty("Please select your ethnicity"),
  phoneNumber: z
    .string()
    .nonempty("Phone number is required")
    .regex(
      /^(\+1|1)?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
      "Phone number is not valid. Eg. +1 (123) 456 7890",
    ),
  email: z
    .string()
    .email("Please enter a valid email.")
    .nonempty("Please enter your email."),
  discordUsername: z.string().nonempty("Please enter your Discord Name."),
  term: z.string().nonempty("Please select your current/last completed term"),
  school: z.string().nonempty("Please enter your school."),
  program: z.string().nonempty("Please specify your program"),
  dietaryRestrictions: z
    .array(z.string())
    .min(1, "Please select at least 1 option")
    .refine((sel) => !(sel.includes("None") && sel.length > 1), {
      message: 'You can only select "None" exclusively',
    }),
  specificAllergies: z.string().optional(),
  tshirtSize: z.string().nonempty("Please select your T-Shirt size"),
  resumeLink: z
    .string()
    .nonempty("Please enter a Google Drive link to a PDF your resume.")
    .regex(
      /https?:\/\/(?:drive\.google\.com\/(?:file\/d\/|drive\/folders\/|open\?id=|uc\?id=)[^\/\&\?]+)/,
      "Please provide a valid Google Drive link. It must be a PDF, it cannot be a Google Doc.",
    )
    .refine(
      (url) => {
        const fileId = extractFileId(url);
        return fileId ? isPublicDriveFile(fileId) : false;
      },
      { message: "THe link you provided is not public." },
    ),
  githubLink: z
    .string()
    .regex(
      /^https?:\/\/(?:www\.)?github\.com\/(?=.{1,39}$)(?!-)(?!.*--)[A-Za-z0-9-]+(?<!-)\/?$/,
      "Please provide a valid GitHub profile",
    )
    .optional(),
  linkedInLink: z
    .string()
    .regex(
      /^https?:\/\/(?:www\.)?linkedin\.com\/in\/[A-Za-z0-9._-]{3,100}\/?$/,
      "Please provide a valid LinkedIn profile",
    )
    .optional(),
  anyLink: z.string().optional(),
  hackathonRole: z
    .array(z.string())
    .min(1, "Please select at least 1 role")
    .refine(
      (sel) =>
        !(
          sel.includes("Never been to a hackathon previously") && sel.length > 1
        ),
      {
        message:
          'You can only select "Never been to a hackathon previously" exclusively',
      },
    ),
  hackathonNum: z.number().min(0, "You can't attend negative hackathons!"),
  cxcGoals: z.string().nonempty("Please fill out this field."),
  ambitions: z.string().nonempty("Please fill out this field."),
  consent: z
    .boolean()
    .refine((val) => val === true, { message: "This field must be true." }),
});
