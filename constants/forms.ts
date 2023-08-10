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
