import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { authRouter } from "./auth";
import { eventRouter } from "./events";
import { memberRouter } from "./members";

export const appRouter = router({
  hello: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
      }),
    )
    .output(
      z.object({
        greeting: z.string().min(1),
      }),
    )
    .query((opts) => {
      return {
        greeting: `Hello ${opts.input.name}`,
      };
    }),
  auth: authRouter,
  events: eventRouter,
  members: memberRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter;
