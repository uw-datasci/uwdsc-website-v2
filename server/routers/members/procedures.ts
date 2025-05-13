/**
 * Member CRUD procedures for the UWDSC TRPC API.
 * Documented with JSDoc and `.meta` so tRPC‑ui can auto‑generate rich API docs.
 */
import { ROLES } from "@/constants/roles";
import { authedProcedure, hasRole } from "../../trpc";
import { z } from "zod";
import { memberModel } from "@/server/db/models/memberModel";
import { memberTypeSchema } from "@/server/db/schemas/member";
import bcrypt from "bcrypt";
import { TRPCError } from "@trpc/server";
import { eventModel } from "@/server/db/models/eventModel";
import { QRPayloadTypeSchema } from "@/constants/member";
import { env } from "@/env/server";

export const memberProcedures = {
  getQrPayload: authedProcedure
    .use(hasRole([ROLES.ADMIN, ROLES.MEMBER]))
    .input(z.object({}))
    .output(QRPayloadTypeSchema)
    .query(async (opts) => {
      const { id } = opts.ctx.user;

      let events = await eventModel
        .find()
        .eventsHappeningOnBuffered(new Date());
      if (!events) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Event not found" });
      }

      return await Promise.all(
        events.map(async (event) => {
          return {
            id: event._id,
            eventSecret: await bcrypt.hash(
              id + env.ACCESS_TOKEN_SECRET + event.secretName,
              10,
            ),
          };
        }),
      );
    }),

  /**
   * Get member(s)
   * @summary Fetch one or more member records
   * @description
   * * **Admin**: supply `ids=[] & retrieveAll=true` to fetch every member, or pass an array of IDs.
   * * **Member**: ignored `ids`; always returns just their own record.
   * Password & token fields are stripped from the response.
   */
  getById: authedProcedure
    .meta({
      description:
        "Return member records based on caller role: self, specific IDs, or all.",
    })
    .use(hasRole([ROLES.ADMIN, ROLES.MEMBER]))
    .input(
      z
        .object({
          ids: z
            .array(z.string().min(1))
            .describe("List of Member IDs to search"),
          retrieveAll: z
            .boolean()
            .optional()
            .describe("If you want to retrieve all members"),
        })
        .strict(),
    )
    .output(
      z.array(memberTypeSchema.omit({ password: true, token: true }).strict()),
    )
    .query(async (opts) => {
      const ids = opts.input.ids;
      let result;
      if (opts.ctx.user.role == ROLES.ADMIN && opts.input.retrieveAll) {
        result = await memberModel
          .find({}, { password: 0, token: 0, __v: 0 })
          .lean();
      } else if (
        opts.ctx.user.role == ROLES.MEMBER ||
        opts.input.ids.length == 0
      ) {
        result = await memberModel
          .find({ _id: opts.ctx.user.id }, { password: 0, token: 0, __v: 0 })
          .lean();
      } else {
        result = await memberModel
          .find({ _id: { $in: ids } }, { password: 0, token: 0, __v: 0 })
          .lean();
      }

      if (!result) {
        console.error(`Could not find member/s with ids: ${ids}`);
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Could not find any of the ids provided.",
        });
      }

      if (
        !opts.input.retrieveAll &&
        ids.length != 0 &&
        opts.ctx.user.role != ROLES.MEMBER &&
        result.length != ids.length
      ) {
        const idsNotFound = ids.filter(
          (id) => !result.map((member) => member._id).includes(id),
        );

        console.error(`Could not find member/s with ids: ${idsNotFound}`);
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Could not find some of the ids provided.",
        });
      }

      console.log(result);

      return result;
    }),

  /**
   * Create member
   * @summary Admin‑only: add a new member
   * @description Hashes the supplied password, creates the member document, and returns a sanitized object.
   */
  create: authedProcedure
    .meta({
      description:
        "Admin-only endpoint to create a new member record and return it without sensitive fields.",
    })
    .use(hasRole([ROLES.ADMIN]))
    .input(
      memberTypeSchema
        .omit({
          _id: true,
          token: true,
          createdAt: true,
          updatedAt: true,
        })
        .strict(),
    )
    .output(memberTypeSchema.omit({ password: true, token: true }).strict())
    .mutation(async (opts) => {
      const { password, ...rest } = opts.input;

      const member = await memberModel.create({
        ...rest,
        password: await bcrypt.hash(password, 10),
      });

      const userObj = member.toObject() as any; // Will throw on runtime if shape does not match

      delete userObj.password;
      delete userObj.token;
      delete userObj.__v;
      delete userObj.id;

      return userObj;
    }),

  /**
   * Update member
   * @summary Admin‑only: patch a member record
   * @description Accepts partial changes, saves, and returns the updated, sanitized member.
   */
  mutateById: authedProcedure
    .meta({
      description:
        "Admin-only endpoint to apply partial updates to a member by ID and return the updated document.",
    })
    .use(hasRole([ROLES.ADMIN]))
    .input(
      z
        .object({
          id: z.string().min(1),
          changes: memberTypeSchema
            .omit({
              _id: true,
              createdAt: true,
              updatedAt: true,
              token: true,
            })
            .partial()
            .strict()
            .describe("Only supply changed to be made, all fields optional"),
        })
        .strict(),
    )
    .output(memberTypeSchema.omit({ password: true, token: true }).strict())
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
      ).toObject() as any;

      delete savedMember.password;
      delete savedMember.token;
      delete savedMember.__v;
      delete savedMember.id;

      return savedMember;
    }),

  /**
   * Delete member
   * @summary Admin‑only: remove a member
   * @description Deletes the member document identified by ID. Returns void.
   */
  deleteById: authedProcedure
    .meta({
      description: "Admin-only endpoint to delete a member by ID.",
    })
    .use(hasRole([ROLES.ADMIN]))
    .input(
      z
        .object({ id: z.string().min(1) })
        .strict()
        .describe("[Member] Unique ID"),
    )
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
