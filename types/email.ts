export type EmailFilter = {
  hasPaid?: boolean;
  isEmailVerified?: boolean;
  userStatus?: string[];
  faculties?: string[];
  isMathSocMember?: boolean;
  customUserIds?: string[];
};

export type EmailRecipient = {
  _id: string;
  username: string;
  email: string;
  faculty?: string;
  watIAM?: string;
  hasPaid?: boolean;
  isEmailVerified?: boolean;
  userStatus?: string;
  isMathSocMember?: boolean;
  paymentMethod?: string;
  verifier?: string;
  paymentLocation?: string;
};
