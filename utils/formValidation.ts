import { string, object, ref } from "yup";

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
  WatIAM: string().required("Please enter your WatIAM ID."),
  email: string()
    .test(
      "is-uwaterloo-email",
      "Please enter your UWaterloo email.",
      (value) =>
        !!value &&
        value.toLowerCase().endsWith("@uwaterloo.ca") &&
        value.length > 13,
    )
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

export const CxCRegistrationSchema = object({});
