import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL: z
      .string()
      .min(1, "UWDSC_WEBSITE_SERVER_URL env variable is empty.")
      .refine(
        (url) => url.startsWith("http") || url.startsWith("https"),
        "Invalid URL format",
      ),
    NEXT_PUBLIC_VERCEL_URL: z
      .string()
      .min(1, "VERCEL_URL env variable is empty.")
      .refine(
        (uri) => uri.endsWith(".vercel.app"),
        "Invalid VERCEL_URL format",
      ),
    NEXT_PUBLIC_PORT: z.string(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL:
      process.env.NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL,
    NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
    NEXT_PUBLIC_PORT: process.env.NEXT_PUBLIC_PORT,
  },
});
