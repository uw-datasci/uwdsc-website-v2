/**
 * Registrant procedures (check-in & CRUD) for the UWDSC tRPC API.
 * Each procedure now has JSDoc plus `.meta({ description })`
 * so trpc-ui can build readable documentation (no summary or tags in meta).
 */
import { authedProcedure, hasRole } from "../../../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { eventModel } from "@/server/db/models/eventModel";
import { ROLES } from "@/constants/roles";
import { Types } from "mongoose";
import { memberModel } from "@/server/db/models/memberModel";
import {
  populatedRegistrantTypeSchema,
  Registrant,
  registrantTypeSchema,
} from "@/server/db/schemas/event";
import { verifyRequirements } from "../util";
import { env } from "@/env/server";
import bcrypt from "bcrypt";

export const registrantProcedures = {
  /**
   * Check-in registrant
   * @summary Admin-only: mark a member as checked in
   * @description Validates the registrant, verifies requirements, records attendance, and returns the updated registrant.
   */
  checkInById: authedProcedure
    .meta({
      description:
        "Admin-only mutation to mark a registrant as checked in after validating requirements.",
    })
    .use(hasRole([ROLES.ADMIN]))
    .input(
      z.object({
        eventId: z.string().min(1).describe("[Event] Unique ID"),
        eventSecret: z
          .string()
          .min(1)
          .describe("[QR Payload] Encoded event secret"),
        memberId: z.string().min(1).describe("[Member] Unique ID"),
      }),
    )
    .output(registrantTypeSchema.strict())
    .mutation(async (opts) => {
      const { eventId, memberId, eventSecret } = opts.input;

      // 1. Fetch the event
      const event = await eventModel.findById(eventId);
      if (!event) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Event not found",
        });
      }

      // 2. Find the matching registrant
      const registrant: Registrant | any = event.registrants.find(
        (r: Registrant) => r.memberId.toString() === memberId,
      );

      if (!registrant) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Registrant not found",
        });
      }

      // 3. Check if already checked in
      if (registrant.checkedIn) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Member is already checked in",
        });
      }

      // 4. Check if member meets requirements
      const member: any = await memberModel.findById(memberId).lean();

      if (!member) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Member not found",
        });
      }

      verifyRequirements(member, registrant, event.requirements);

      // 5. Check secret validity
      const combinedEventSecret =
        memberId + env.ACCESS_TOKEN_SECRET + event.secretName;
      if (!(await bcrypt.compare(combinedEventSecret, eventSecret))) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Event secret from QR paylod is invalid",
        });
      }
      // 6. Mark as checked in and save
      registrant.checkedIn = true;
      await event.save();

      // 7. Return the updated registrant
      return JSON.parse(JSON.stringify(registrant));
    }),

  /**
   * Get registrant(s)
   * @summary Admin-only: fetch one or more registrants
   * @description Returns registrant objects populated with member data for the specified memberId list.
   */
  getById: authedProcedure
    .meta({
      description:
        "Admin-only query to fetch registrants for an event and populate each with member information.",
    })
    .use(hasRole([ROLES.ADMIN]))
    .input(
      z.object({
        eventId: z.string().min(1).describe("[Event] Unique ID"),
        memberId: z.array(z.string().min(1)).describe("[Member] Unique ID"),
      }),
    )
    .output(z.array(populatedRegistrantTypeSchema.strict()))
    .query(async (opts) => {
      const { eventId, memberId } = opts.input;

      // Convert string ids to ObjectId once
      const memberObjectIds = memberId.map((id) => new Types.ObjectId(id));

      // Step 1: aggregate to keep only requested registrants
      const [event] = await eventModel.aggregate([
        { $match: { _id: new Types.ObjectId(eventId) } },
        {
          $project: {
            registrants: {
              $filter: {
                input: "$registrants",
                as: "r",
                cond: { $in: ["$$r.memberId", memberObjectIds] },
              },
            },
          },
        },
      ]);

      if (!event) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Event not found",
        });
      }

      // Ensure we matched *all* requested ids
      if (event.registrants.length !== memberId.length) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "One or more memberIds are not registered for this event",
        });
      }

      // Step 2: fetch the corresponding members in ONE query
      const members = await memberModel
        .find({
          _id: { $in: memberObjectIds },
        })
        .lean();

      if (members.length !== memberId.length) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "One or more member documents not found",
        });
      }

      const memberMap = new Map(members.map((m: any) => [m._id.toString(), m]));

      // Replace memberId with the full member object
      const populatedRegistrants = event.registrants.map((r: Registrant) => {
        const { memberId, ...rest } = r;
        return {
          ...rest,
          member: memberMap.get(memberId.toString()),
        };
      });

      console.log(populatedRegistrants);

      return populatedRegistrants;
    }),

  /**
   * Add registrant
   * @summary Admin-only: append a new registrant
   * @description Validates membership & requirements, appends the registrant, and returns the saved entry.
   */
  attachById: authedProcedure
    .meta({
      description:
        "Admin-only mutation to append a new registrant to an event after validating requirements.",
    })
    .use(hasRole([ROLES.ADMIN]))
    .input(
      z.object({
        eventId: z.string().min(1).describe("[Event] Unique ID"),
        registrant: registrantTypeSchema.describe("Registrant object"),
      }),
    )
    .output(registrantTypeSchema.strict())
    .mutation(async (opts) => {
      const { eventId, registrant } = opts.input;

      const event = await eventModel.findById(eventId).lean();
      if (!event) {
        console.error(`Event with id ${eventId} does not exist`);
        throw new TRPCError({ code: "NOT_FOUND", message: "Event not found" });
      }

      const member = await memberModel.findById(registrant.memberId).lean();
      if (!member) {
        console.error(`Member with id ${registrant.memberId} does not exist`);
        throw new TRPCError({ code: "NOT_FOUND", message: "Member not found" });
      }

      verifyRequirements(member, {}, { member: event.requirements.member });

      const updateResult = await eventModel.updateOne(
        {
          _id: eventId,
          "registrants.memberId": { $ne: registrant.memberId },
        },
        { $addToSet: { registrants: registrant } },
      );

      if (updateResult.modifiedCount === 0) {
        // Either event not found or registrant already exists
        const eventExists = await eventModel.exists({ _id: eventId });
        if (!eventExists) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Event not found",
          });
        } else {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Member is already a registrant",
          });
        }
      }

      // Re-fetch the inserted registrant
      const updatedEvent = await eventModel.findById(eventId).lean();
      const savedRegistrant = updatedEvent?.registrants.find(
        (r: any) => r.memberId.toString() === registrant.memberId,
      );

      return JSON.parse(JSON.stringify(savedRegistrant));
    }),

  /**
   * Update registrant
   * @summary Admin-only: patch a registrant entry
   * @description Applies partial changes to a registrant and returns the updated version.
   */
  mutateById: authedProcedure
    .meta({
      description:
        "Admin-only mutation to update a registrant by ID and return the modified object.",
    })
    .input(
      z.object({
        eventId: z.string().min(1).describe("[Event] Unique ID"),
        memberId: z.string().min(1).describe("[Member] Unique ID"),
        changes: registrantTypeSchema
          .omit({ memberId: true })
          .partial()
          .strict()
          .describe("Only supply changed to be made, all fields optional"),
      }),
    )
    .output(registrantTypeSchema.strict())
    .mutation(async ({ input }) => {
      // Build a flat $set object like { "registrants.$.checkedIn": true }
      const setObj: Record<string, unknown> = {};
      Object.entries(input.changes).forEach(([k, v]) => {
        setObj[`registrants.$.${k}`] = v;
      });

      const result = await eventModel
        .findOneAndUpdate(
          { _id: input.eventId, "registrants.memberId": input.memberId },
          { $set: setObj },
          { new: true },
        )
        .lean();

      if (!result) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Registrant or event not found",
        });
      }

      return JSON.parse(
        JSON.stringify(
          result.registrants.find(
            (r: any) => r.memberId.toString() === input.memberId,
          ),
        ),
      );
    }),

  /**
   * Delete registrant
   * @summary Admin-only: remove a registrant
   * @description Removes the registrant from the event’s list. Returns void.
   */
  deleteById: authedProcedure
    .meta({
      description: "Admin-only mutation to delete a registrant from an event.",
    })
    .input(
      z.object({
        eventId: z.string().min(1).describe("[Event] Unique ID"),
        memberId: z.string().min(1).describe("[Member] Unique ID"),
      }),
    )
    .output(z.void())
    .mutation(async ({ input }) => {
      const updatedEvent = await eventModel
        .findByIdAndUpdate(
          input.eventId,
          { $pull: { registrants: { memberId: input.memberId } } },
          { new: true },
        )
        .lean();

      if (!updatedEvent) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Event not found",
        });
      }
    }),
};
