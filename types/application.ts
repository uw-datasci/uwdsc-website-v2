export interface ApplicationFormValues {
  // Personal Information
  uwEmail: string;
  personalEmail: string;
  fullName: string;

  // Academic Information
  program: string;
  academicTerm: string;
  location: string;

  // Club Experience
  previousMember: boolean;
  previousExperience: string;

  // Resume
  resumeUrl: string;

  // Dynamic questions
  questionAnswers: Record<string, any>;
}

export interface Question {
  id: string;
  type: string;
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
  appReleaseDate: string;
  appDeadline: string;
  questions: Question[];
}
