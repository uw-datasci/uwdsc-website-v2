export type Role = "member" | "admin";

export const roleOptions = ["member", "admin"] as const;

export const ROLES = {
  MEMBER: "member",
  ADMIN: "admin",
} as const;

