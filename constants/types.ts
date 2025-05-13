export const HTTP_CONSTANTS = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERROR: 500,
} as const;

export const typeConstants = ["array", "string", "number", "boolean"] as const;
export type TypeConstant = (typeof typeConstants)[number];
