export const statusOptions = [
  "Accepted",
  "Confirmed",
  "Waitlist",
  "Rejected",
  "Expired",
  "Applied",
] as const;

export type Status = (typeof statusOptions)[number];
