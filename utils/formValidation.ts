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
