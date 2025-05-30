import { type ContactField } from "@/types/types";

export const CONTACT_FORM_FIELDS: ContactField[] = [
  {
    id: "name",
    name: "name",
    type: "input",
    placeholder: "Name",
  },
  {
    id: "email",
    name: "email",
    type: "input",
    placeholder: "Email",
  },
  {
    id: "purpose",
    name: "purpose",
    type: "dropdown",
    placeholder: "Purpose of Contact",
    options: ["Sponsorship", "General Inquiry", "Other"],
  },
  {
    id: "message",
    name: "message",
    type: "textarea",
    placeholder: "Message",
  },
];

export const SPONSOR_FORM_FIELDS: ContactField[] = [
  {
    id: "name",
    name: "name",
    type: "input",
    placeholder: "Name",
  },
  {
    id: "company",
    name: "company",
    type: "input",
    placeholder: "Company / Organization",
  },
  {
    id: "email",
    name: "email",
    type: "input",
    placeholder: "Work Email",
  },
  {
    id: "message",
    name: "message",
    type: "textarea",
    placeholder: "Message",
  },
];

export const SIGN_UP_FORM_FIELDS_PART1: ContactField[] = [
  {
    id: "name",
    name: "name",
    type: "input",
    placeholder: "First name, Last name",
  },
  {
    id: "WatIAM",
    name: "WatIAM",
    type: "input",
    placeholder: "WatIAM (ex. slchow)",
  },
  {
    id: "email",
    name: "email",
    type: "input",
    placeholder: "Email (ex. slchow@uwaterloo.ca)",
  },
  {
    id: "password",
    name: "password",
    type: "password",
    placeholder: "Create DSC account password (ex. d0ubl3_d3sc3nt)",
    autoCap: "off",
  },
];

export const SIGN_UP_FORM_FIELDS_PART2: ContactField[] = [
  {
    id: "faculty",
    name: "faculty",
    type: "dropdown",
    placeholder:
      "Faculty*",
    options: [
      "Math",
      "Engineering",
      "Science",
      "Arts",
      "Health",
      "Environment",
      "Other/Non-waterloo",
    ],
    classes: "z-50",
  },
  {
    id: "term",
    name: "term",
    type: "dropdown",
    placeholder: "Current/Last completed term",
    options: [
      "1A",
      "1B",
      "2A",
      "2B",
      "3A",
      "3B",
      "4A",
      "4B",
      "Masters",
      "PHD",
      "Other/Non-waterloo",
    ],
    classes: "z-40",
  },
  {
    id: "advert",
    name: "advert",
    type: "input",
    placeholder: "Where did you hear about us?",
  },
  {
    id: "ideas",
    name: "ideas",
    type: "textarea",
    placeholder: "[Optional] Share your ideas for new events or improvements!",
    classes: "max-h-24",
  },
];

export const SIGN_IN_FORM_FIELDS: ContactField[] = [
  {
    id: "email",
    name: "email",
    type: "input",
    placeholder: "Email (ex. slchow@uwaterloo.ca)",
  },
  {
    id: "password",
    name: "password",
    type: "password",
    placeholder: "Your DSC account password (ex. d0ubl3_d3sc3nt)",
    autoCap: "off",
  },
];

export const FORGOT_PASSWORD_FORM_FIELDS: ContactField[] = [
  {
    id: "email",
    name: "email",
    type: "input",
    placeholder: "Email (ex. slchow@uwaterloo.ca)",
  },
];

export const RESET_PASSWORD_FORM_FIELDS: ContactField[] = [
  {
    id: "newPass",
    name: "newPass",
    type: "password",
    placeholder: "A new DSC account password (ex. R4nd0M_f0R3sT)",
    autoCap: "off",
  },
  {
    id: "confrimPass",
    name: "confirmPass",
    type: "password",
    placeholder: "The same password as above (ex. R4nd0M_f0R3sT)",
    autoCap: "off",
  },
];
