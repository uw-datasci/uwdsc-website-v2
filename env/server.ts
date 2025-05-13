import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    MONGODB_URI: z
      .string()
      .min(1, "MONGODB_URI env variable is empty.")
      .refine(
        (uri) => uri.startsWith("mongodb+srv"),
        "Invalid MONGODB_URI format",
      ),
    ACCESS_TOKEN_SECRET: z
      .string()
      .min(1, "ACCESS_TOKEN_SECRET env variable is empty."),
    EMAIL_USER: z.string().min(1),
    EMAIL_APPLICATION_PASSWORD: z.string().min(1),
    CURRENT_REGISTERED_EVENT_ID: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    GOOGLE_CLIENT_REFRESH_TOKEN: z.string(),
  },
  experimental__runtimeEnv: process.env,
});
