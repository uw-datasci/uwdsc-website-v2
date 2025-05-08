import { ROLES } from "@/constants/roles";
import { authedProcedure, hasRole } from "../../trpc";
import { z } from "zod";
import { memberModel } from "@/server/db/models/memberModel";
import { MemberTypeSchema } from "@/server/db/schemas/member";
import bcrypt from "bcrypt";
import { TRPCError } from "@trpc/server";

export const memberProcedures = {
  getMembersById: authedProcedure
    .use(hasRole([ROLES.ADMIN, ROLES.MEMBER]))
    .input(
      z
        .object({
          ids: z.array(z.string().min(1)),
          retrieveAll: z.boolean().optional(),
        })
        .strict(),
    )
    .output(
      z.array(MemberTypeSchema.omit({ password: true, token: true }).strict()),
    )
    .query(async (opts) => {
      const ids = opts.input.ids;
      let result;
      if (opts.ctx.user.userStatus == ROLES.MEMBER) {
        result = await memberModel
          .find({ _id: opts.ctx.user.id }, { password: 0, token: 0 })
          .lean({ virtuals: true });
      } else if (opts.input.retrieveAll) {
        result = await memberModel
          .find({}, { password: 0, token: 0 })
          .lean({ virtuals: true });
      } else if (opts.input.ids.length == 0) {
        result = await memberModel
          .find({ _id: opts.ctx.user.id }, { password: 0, token: 0 })
          .lean({ virtuals: true });
      } else {
        result = await memberModel
          .find({ _id: { $in: ids } }, { password: 0, token: 0 })
          .lean({ virtuals: true });
      }

      if (!result) {
        console.error(`Could not find member/s with ids: ${ids}`);
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Could not find any of the ids provided.",
        });
      }

      if (result.length != ids.length) {
        const idsNotFound = ids.filter(
          (id) => !result.map((member) => member.id).includes(id),
        );

        console.error(`Could not find member/s with ids: ${idsNotFound}`);
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Could not find some of the ids provided.",
        });
      }

      return result;
    }),

  createMember: authedProcedure
    .use(hasRole([ROLES.ADMIN]))
    .input(
      MemberTypeSchema.omit({
        id: true,
        token: true,
        createdAt: true,
        updatedAt: true,
      }).strict(),
    )
    .output(MemberTypeSchema.omit({ password: true, token: true }).strict())
    .mutation(async (opts) => {
      const { password, ...rest } = opts.input;

      const member = await memberModel.create({
        ...rest,
        password: await bcrypt.hash(password, 10),
      });

      const userObj = member.toObject({ virtuals: true }) as any; // Will throw on runtime if shape does not match

      delete userObj.password;
      delete userObj.token;

      return userObj;
    }),

  mutateMemberById: authedProcedure
    .use(hasRole([ROLES.ADMIN]))
    .input(
      z
        .object({
          id: z.string(),
          changes: MemberTypeSchema.omit({
            id: true,
            createdAt: true,
            updatedAt: true,
          }).strict(),
        })
        .strict(),
    )
    .output(MemberTypeSchema.omit({ password: true, token: true }).strict())
    .mutation(async (opts) => {
      const { id, changes } = opts.input;
      const existingMember = await memberModel.findById(id);

      if (!existingMember) {
        console.error(`Could not find member with id: ${id}`);
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Could not find the member with provided id",
        });
      }

      const savedMember = (
        await existingMember
          .set({
            ...changes,
          })
          .save()
      ).toObject({ virtuals: true }) as any;

      delete savedMember.password;
      delete savedMember.token;

      return savedMember;
    }),

  deleteMemberById: authedProcedure
    .use(hasRole([ROLES.ADMIN]))
    .input(z.object({ id: z.string() }).strict())
    .output(z.void())
    .mutation(async (opts) => {
      const { id } = opts.input;
      const existingMember = await memberModel.findById(id);

      if (!existingMember) {
        console.error(`Could not find member with id: ${id}`);
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Could not find the member with provided id",
        });
      }

      await existingMember.deleteOne();
    }),
};
