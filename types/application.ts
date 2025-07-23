export interface ApplicationFormValues {
  // Resume
  resumeUrl: string;
  // Dynamic questions
  roleQuestionAnswers: {
    [role: string]: {
      [questionId: string]: string | string[] | boolean;
    };
  };
  rolesApplyingFor: string[];
}

export type Role =
  | "Events Exec"
  | "Events Co-VP"
  | "Design Exec"
  | "Education Exec"
  | "Internal Exec"
  | "Outreach Exec"
  | "Outreach Co-VP"
  | "Development Exec"
  | "Development Co-VP"
  | "Social Media Exec"
  | "Social Media VP"
  | "general"
  | "supplementary";

export type QuestionType =
  | "text"
  | "textarea"
  | "multiple_choice"
  | "file_upload"
  | "checkbox"
  | "date"
  | "number";

export interface Question {
  id: string; // unique identifier for question
  role: Role;
  type: QuestionType;
  question: string;
  required?: boolean;
  order: number;
  maxLength?: number; // only valid for "text" or "textarea"
  options?: string[]; // only valid for "multiple_choice" or "checkbox"
  acceptedTypes?: string[]; // only valid for "file_upload"
  placeholder?: string;
  helpText?: string;
}

export interface Term {
  id: string;
  termName: string;
  appReleaseDate: Date;
  appDeadline: Date;
  questions: Question[];
}
