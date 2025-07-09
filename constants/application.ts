export const STEP_NAMES = [
  "",
  "Personal Details",
  "Experience",
  "Positions",
  "Supplementary Information",
];

export const PERSONAL_FIELDS = [
  "uwEmail",
  "personalEmail",
  "fullName",
  "program",
  "academicTerm",
  "location",
  "pastExecutive",
];

export const BLANK_APPLICATION = {
  personalInfo: {
    uwEmail: "",
    personalEmail: "",
    fullName: "",
  },
  academicInfo: {
    program: "",
    academicTerm: "",
    location: "",
  },
  clubExperience: {
    previousMember: false,
    previousExperience: "",
  },
  questionAnswers: {},
  resumeUrl: "",
  status: "draft",
};
