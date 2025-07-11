export interface ApplicationFormValues {
  rolesApplyingFor: string[];
  roleQuestionAnswers: Record<string, Record<string, any>>;
  resumeUrl: string;
}

export interface Question {
  id: string;
  role: string;
  type: "text" | "textarea" | "multiple_choice" | "file_upload" | "checkbox" | "date" | "number";
  question: string;
  required: boolean;
  order: number;
  maxLength?: number;
  options?: string[];
  acceptedTypes?: string[];
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
