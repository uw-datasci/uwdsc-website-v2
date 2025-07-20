export const STEP_NAMES = [
  "",
  "Personal Details",
  "Positions",
  "Experience",
  "Supplementary Information",
];

export const PERSONAL_FIELDS = [
  "waterloo_email",
  "personal_email",
  "full_name",
  "program",
  "academic_term",
  "location",
];

export const EXPERIENCE_FIELDS = ["skills", "motivation"];

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
      previous_member: "",
      club_experience: "",
      skills: "",
      motivation: "",
    },
  },
  resumeUrl: "",
  status: "draft",
};

export const NO_PREV_EXPERIENCE = "N/A";

export const MAX_ALLOWED_ROLES_TO_APPLY = 3;
