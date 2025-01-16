import { string, object, ref, boolean, array, number } from "yup";

require("dotenv").config();

function extractFileId(driveUrl: string) {
  const match =
    driveUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
    driveUrl.match(/id=([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

async function isPublicDriveFile(fileId: string) {
  try {
    const response = await fetch(`/api/other/google-drive?fileId=${fileId}`);
    return response.ok;
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}

export const ContactFormSchema = object({
  name: string().required("Please enter your name."),
  email: string()
    .email("Please enter a valid email.")
    .required("Please enter your email."),
  purpose: string().required("Please select the purpose of your contact."),
});

export const SponsorFormSchema = object({
  name: string().required("Please enter your name."),
  email: string()
    .email("Please enter a valid email.")
    .required("Please enter your work email."),
  company: string().required("Please enter your company or organization name."),
});

export const SignUpFormPart1Schema = object({
  name: string().required("Please enter your name."),
  WatIAM: string(),
  email: string()
    .email("Email must be valid.")
    .required("Please enter your UWaterloo email."),
  password: string()
    .min(8, "Your password needs to be at least 8 characters long.")
    .required("Your password is required."),
});

export const SignUpFormPart2Schema = object({
  faculty: string().required("Please select your faculty."),
  term: string().required("Please select your current/last completed term."),
  advert: string().required("Let us know where you heard about us!"),
});

export const SignInFormSchema = object({
  email: string()
    .required("Please enter your email.")
    .email("Please enter a valid email."),
  password: string().required("Please enter your password."),
});

export const ForgotPasswordFormSchema = object({
  email: string()
    .required("Please enter the email associated with your account.")
    .email("Please enter a valid email."),
});

export const ResetPasswordFormSchema = object({
  newPass: string()
    .min(8, "Your password needs to be at least 8 characters long.")
    .required("New password is required."),
  confirmPass: string()
    .oneOf([ref("newPass"), undefined], "Passwords do not match.")
    .required("Confirm Password is required."),
});

export const CxCRegistrationSchema = object({
  firstName: string().required("First name is required"),
  lastName: string().required("Last name is required"),
  pronoun: string().required("Please select your pronouns"),
  ethnicity: string().required("Please select your ethnicity"),
  phoneNumber: string()
    .required("Phone number is required")
    .matches(
      /^(\+1|1)?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
      "Phone number is not valid. Eg. +1 (123) 456 7890",
    ),
  email: string()
    .email("Please enter a valid email.")
    .required("Please enter your email."),
  discordUsername: string().required("Please enter your Discord Name."),
  term: string().required("Please select your current/last completed term"),
  school: string().required("Please enter your school."),
  program: string().required("Please specify your program"),
  dietaryRestrictions: array()
    .of(string().required("Each item must be a string"))
    .min(1, "Please select at least 1 option")
    .test("is-none", 'You can only select "None" exclusively', (selection) => {
      if (selection) {
        return !(selection.includes("None") && selection.length > 1);
      }
      return true;
    })
    .required("Please select your dietary restrictions."),
  specificAllergies: string(),
  tshirtSize: string().required("Please select your T-Shirt size"),
  resumeLink: string()
    .required("Please enter a Google Drive link to a PDF your resume.")
    .matches(
      /https?:\/\/(?:drive\.google\.com\/(?:file\/d\/|drive\/folders\/|open\?id=|uc\?id=)[^\/\&\?]+)/,
      "Please provide a valid Google Drive link. It must be a PDF, it cannot be a Google Doc.",
    )
    .test("is-public", "THe link you provided is not public.", (url) => {
      const fileId: string | null = extractFileId(url);
      if (fileId) {
        return isPublicDriveFile(fileId);
      } else {
        return false;
      }
    }),
  githubLink: string().matches(
    /^https?:\/\/(?:www\.)?github\.com\/(?=.{1,39}$)(?!-)(?!.*--)[A-Za-z0-9-]+(?<!-)\/?$/,
    "Please provide a valid GitHub profile",
  ),
  linkedInLink: string().matches(
    /^https?:\/\/(?:www\.)?linkedin\.com\/in\/[A-Za-z0-9._-]{3,100}\/?$/,
    "Please provide a valid LinkedIn profile",
  ),
  anyLink: string(),
  hackathonRole: array()
    .of(string().required("Each item must be a string"))
    .min(1, "Please select at least 1 role")
    .test(
      "is-none",
      'You can only select "Never been to a hackathon previously" exclusively',
      (selection) => {
        if (selection) {
          return !(
            selection.includes("Never been to a hackathon previously") &&
            selection.length > 1
          );
        }
        return true;
      },
    )
    .required("Please select a role"),
  hackathonNum: number()
    .min(0, "You can't attend negative hackathons!")
    .required("Please select how many hackathons you've attended"),
  cxcGoals: string().required("Please fill out this field."),
  ambitions: string().required("Please fill out this field."),
  consent: boolean()
    .oneOf([true], "This field must be true.")
    .required("Required"),
});
