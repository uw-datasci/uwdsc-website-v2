// server/trpc.ts
import { initTRPC, TRPCError } from "@trpc/server";
import type { Context } from "./context";
import { memberModel } from "./db/models/memberModel";
import { Role } from "@/constants/roles";

const t = initTRPC.context<Context>().create();

// Router
export const router = t.router;

// Procedures
export const publicProcedure = t.procedure;
export const authedProcedure = publicProcedure.use(
  async function isAuthed(opts) {
    const { ctx } = opts;

    if (!ctx.user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Missing or expired token",
      });
    }

    const user = await memberModel
      .findById(ctx.user.id)
      .select("userStatus")
      .lean();

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User is not found",
      });
    }

    if (ctx.user.userStatus !== user.userStatus) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "TOKEN_OUT_OF_SYNC",
      });
    }

    return opts.next({
      ctx: {
        ...ctx,
        user: ctx.user,
      },
    });
  },
);

// Middleware
export const hasRole = (allowedRoles: Role[]) => {
  return t.middleware(({ ctx, next }) => {
    const user = ctx.user;
    if (!user || !allowedRoles.includes(user.userStatus as Role)) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Insufficient permissions",
      });
    }
    return next();
  });
};
