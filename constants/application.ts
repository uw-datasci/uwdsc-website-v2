export const STEP_NAMES = [
  "",
  "Personal Details",
  "General",
  "Positions",
  "Supplementary Information",
];

export const PERSONAL_FIELDS = [
  "waterloo_email",
  "personal_email",
  "full_name",
  "program",
  "academic_term",
  "location",
  "club_experience",
];

export const GENERAL_FIELDS = ["skills", "motivation"];

export const BLANK_APPLICATION = {
  rolesApplyingFor: [],
  roleQuestionAnswers: {
    general: {
      full_name: "",
      personal_email: "",
      waterloo_email: "",
      program: "",
      academic_term: "",
      location: "",
      club_experience: false,
      skills: "",
      motivation: "",
    },
  },
  resumeUrl: "",
  status: "draft",
};

export const MAX_ALLOWED_ROLES_TO_APPLY = 3;
