import { TRPCError, initTRPC } from "@trpc/server";
import type { Context } from "./context";
import { RateLimiterMemory } from "rate-limiter-flexible";

const t = initTRPC.context<Context>().create();

const limiter = new RateLimiterMemory({
  points: 100,
  duration: 60,
});

export const rateLimitMiddleware = t.middleware(async (opts) => {
  const { ctx } = opts;

  const identifier = ctx.user?.id || ctx.ip;
  if (!identifier) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Missing user or IP for rate limiting",
    });
  }

  try {
    await limiter.consume(identifier);
  } catch {
    throw new TRPCError({
      code: "TOO_MANY_REQUESTS",
      message: "Rate limit exceeded",
    });
  }

  return opts.next();
});
