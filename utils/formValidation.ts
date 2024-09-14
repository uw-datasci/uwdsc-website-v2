export const validateContactForm = (values: Record<string, string>) => {
  const errors: Record<string, string> = {};

  if (!values.name) {
    errors.name = "Please enter your name.";
  }

  if (!values.email) {
    errors.email = "Please enter your email.";
  }

  if (!values.purpose) {
    errors.purpose = "Please select the purpose of your contact.";
  }

  return errors;
};

export const validateSponsorForm = (values: Record<string, string>) => {
  const errors: Record<string, string> = {};

  if (!values.name) {
    errors.name = "Please enter your name.";
  }

  if (!values.email) {
    errors.email = "Please enter your work email.";
  }

  if (!values.company) {
    errors.company = "Please enter your company or organization name.";
  }

  return errors;
};

export const validateSignUpFormPart1 = (values: Record<string, string>) => {
  const errors: Record<string, string> = {};
  const allowedEmail = "@uwaterloo.ca"

  if (!values.name) {
    errors.name = "Please enter your name.";
  }

  if (!values.WatIAM) {
    errors.WatIAM = "Please enter your WatIAM ID.";
  }

  if (!values.email || !values.email.toLowerCase().includes(allowedEmail) || values.email.length < (allowedEmail.length + 1)) {
    errors.email = "Please enter your UWaterloo email.";
  }
  
  if (!values.password || values.password.length < 8) {
    errors.password = "Your password needs to be at least 8 characters long.";
  }

  return errors;
};

export const validateSignUpFormPart2 = (values: Record<string, string>) => {
  const errors: Record<string, string> = {};

  if (!values.faculty) {
    errors.faculty = "Please select your faculty.";
  }

  if (!values.term) {
    errors.term = "Please select your current/last completed term.";
  }

  if (!values.advert) {
    errors.advert = "Let us know where you heard about us!";
  }
  
  return errors;
};

export const validateSignInForm = (values: Record<string, string>) => {
  const errors: Record<string, string> = {};

  if (!values.email) {
    errors.email = "Please enter your email.";
  }

  if (!values.password) {
    errors.password = "Please enter your password.";
  }

  return errors;
};

export const validateForgotPasswordForm = (values: Record<string, string>) => {
  const errors: Record<string, string> = {};

  if (!values.email) {
    errors.email = "Please enter your email.";
  }

  return errors;
};