/**
 * Sub-event procedures (check-in + CRUD) for the UWDSC TRPC API.
 * Each procedure is documented with JSDoc plus `.meta({ description })`
 * so tRPC-ui can surface readable docs (no summary or tags in meta).
 */
import { authedProcedure, hasRole, publicProcedure } from "../../../trpc";
import { z } from "zod";
import { ROLES } from "@/constants/roles";
import { TRPCError } from "@trpc/server";
import { SubEvent, subEventTypeSchema } from "@/server/db/schemas/event";
import { eventModel } from "@/server/db/models/eventModel";
import { Types, HydratedDocument } from "mongoose";
import { env } from "@/env/server";
import bcrypt from "bcrypt";

export const subEventProcedures = {
  /**
   * Check-in
   * @summary Admin-only: record attendance for a sub-event
   * @description Ensures the member is registered, not already checked in, appends their ID to `checkedIn`, and returns the updated sub-event.
   */
  checkInById: authedProcedure
    .meta({
      description:
        "Record a member check-in to a sub-event after validating registration and duplication.",
    })
    .use(hasRole([ROLES.ADMIN]))
    .input(
      z.object({
        eventId: z.string().min(1).describe("[Event] Unique ID"),
        eventSecret: z
          .string()
          .min(1)
          .describe("[QR Payload] Encoded event secret"),
        subEventId: z
          .string()
          .min(1)
          .describe("[SubEvent] Unique ID within Event"),
        memberId: z.string().min(1).describe("[Member] Unique ID"),
      }),
    )
    .output(subEventTypeSchema.strict())
    .mutation(async (opts) => {
      const { eventId, eventSecret, subEventId, memberId } = opts.input;

      // 1️)  Find the parent event
      const event = await eventModel.findById(eventId);
      if (!event) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Event not found",
        });
      }

      // 2) Check if user is already registered
      if (!event.registrants.some((r) => r.memberId.toString() === memberId)) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Member is not registered for the event",
        });
      }

      // 3) Find the target sub-event
      const subEvent: HydratedDocument<SubEvent> | undefined =
        event.subEvents.find(
          (se): se is HydratedDocument<SubEvent> =>
            se._id.toString() === subEventId,
        );
      if (!subEvent) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Sub event not found",
        });
      }

      // 4) Check if member already checked in
      const alreadyChecked = subEvent.checkedIn.some(
        (id: any) => id.toString() === memberId,
      );
      if (alreadyChecked) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Member is already checked in",
        });
      }

      // 5) Check secret validity
      const combinedEventSecret =
        memberId + env.ACCESS_TOKEN_SECRET + event.secretName;
      if (!(await bcrypt.compare(combinedEventSecret, eventSecret))) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Event secret from QR paylod is invalid",
        });
      }

      // 6) Append memberId and persist
      subEvent.checkedIn.push(memberId);
      await event.save();

      // 7) Return updated sub-event
      return subEvent.toObject();
    }),
  /**
   * Public sub-events
   * @summary List public-facing sub-events for a given event + date range
   * @description Returns basic info (name, description, location, start/end) for sub-events whose start time falls inside [`from`, `to`].
   */
  getByDateTimePublic: publicProcedure
    .meta({
      description:
        "Return only the public fields of sub-events whose startTime is within the specified interval.",
    })
    .input(
      z
        .object({
          eventName: z.string().min(1).describe("[Event] Name"),
          from: z.coerce
            .date()
            .describe("ISO date string, eg. 1970-01-01T00:00:00"),
          to: z.coerce
            .date()
            .describe("ISO date string, eg. 1970-12-30T00:00:00"),
        })
        .strict(),
    )
    .output(
      z.array(
        subEventTypeSchema
          .pick({
            name: true,
            description: true,
            location: true,
            startTime: true,
            endTime: true,
          })
          .strict(),
      ),
    )
    .query(async (opts) => {
      const { eventName, from, to } = opts.input;
      const event = await eventModel
        .findOne({ name: eventName })
        .select({ subEvents: 1 })
        .lean();

      if (!event) {
        console.error(`Could not find event with name: ${eventName}`);
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Could not find the event with provided id",
        });
      }

      // Filter sub-events that overlap the requested datetime range
      const subEventsInRange = (event.subEvents ?? []).filter(
        (se: SubEvent) => se.startTime <= to && se.startTime >= from,
      );

      // Return only the public-facing fields
      return subEventsInRange.map(
        ({ name, description, location, startTime, endTime }) => ({
          name,
          description,
          location,
          startTime,
          endTime,
        }),
      );
    }),

  /**
   * Admin sub-events by time
   * @summary Fetch sub-events for an event within a buffered date range
   * @description Supports same-day queries (when `from === to`) and partial ranges. Requires admin role.
   */
  getByDateTime: authedProcedure
    .meta({
      description:
        "Admin-only query to fetch sub-events in a date range or on a single day.",
    })
    .use(hasRole([ROLES.ADMIN]))
    .input(
      z
        .object({
          eventId: z.string().min(1).describe("[Event] Unique ID"),
          from: z.coerce
            .date()
            .optional()
            .describe("ISO date string, eg. 1970-01-01T00:00:00"),
          to: z.coerce
            .date()
            .optional()
            .describe("ISO date string, eg. 1970-12-30T00:00:00"),
        })
        .strict(),
    )
    .output(z.array(subEventTypeSchema.strict()))
    .query(async (opts) => {
      const { eventId, from, to } = opts.input;
      let results;

      const event = await eventModel
        .findById(eventId)
        .select({ subEvents: 1 })
        .lean();

      if (!event) {
        console.error(`Could not find event with id: ${eventId}`);
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Could not find the event with provided id",
        });
      }

      if (from && to) {
        if (from.getTime() === to.getTime()) {
          results = (event.subEvents ?? []).filter(
            (se: SubEvent) => se.startTime <= from && se.endTime >= from,
          );
        } else {
          results = (event.subEvents ?? []).filter(
            (se: SubEvent) => se.startTime <= to && se.startTime >= from,
          );
        }
      } else if (from) {
        results = (event.subEvents ?? []).filter(
          (se: SubEvent) => se.startTime >= from,
        );
      } else if (to) {
        results = (event.subEvents ?? []).filter(
          (se: SubEvent) => se.startTime <= to,
        );
      } else {
        console.error(`User did not specify Datetime range`);
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You did not provided at least from or to",
        });
      }

      return results;
    }),

  /**
   * Get sub-event(s)
   * @summary Fetch one or all sub-events of an event
   * @description Admin-only. Pass `retrieveAll=true` to return every sub-event, or supply an array of IDs.
   */
  getById: authedProcedure
    .meta({
      description:
        "Admin-only endpoint to fetch specific sub-events (or all) for a given event.",
    })
    .use(hasRole([ROLES.ADMIN]))
    .input(
      z
        .object({
          eventId: z.string().min(1).describe("[Event] Unique ID"),
          subEventId: z
            .array(z.string().min(1))
            .describe("[SubEvent] Unique ID within Event"),
          retrieveAll: z
            .boolean()
            .optional()
            .describe("If you want to retrieve all Events"),
        })
        .strict(),
    )
    .output(z.array(subEventTypeSchema.strict()))
    .query(async (opts) => {
      const { retrieveAll, eventId, subEventId } = opts.input;

      const event = await eventModel
        .findById(eventId)
        .select({ subEvents: 1 })
        .lean();

      if (!event) {
        console.error(`Could not find event with id: ${eventId}`);
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Could not find the event with provided id",
        });
      }

      const subEvent: SubEvent[] = retrieveAll
        ? event.subEvents
        : event.subEvents.filter((se: SubEvent) =>
            subEventId.includes(se._id.toString()),
          );
      if (!subEvent) {
        console.error(`Could not find subEvent with id: ${subEventId}`);
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Could not find the sub event with provided id",
        });
      }

      return subEvent;
    }),
  /**
   * Create sub-event
   * @summary Admin-only: add a new sub-event to an event
   * @description Pushes a new sub-event document into the parent event’s `subEvents` array and returns it.
   */
  create: authedProcedure
    .meta({
      description:
        "Admin-only mutation to create a sub-event and return the saved object.",
    })
    .use(hasRole([ROLES.ADMIN]))
    .input(
      z.object({
        eventId: z.string().min(1),
        subEvent: subEventTypeSchema.omit({ _id: true }).strict(),
      }),
    )
    .output(subEventTypeSchema.strict())
    .mutation(async (opts) => {
      const { eventId, subEvent } = opts.input;
      const event = await eventModel.findById(eventId);
      if (!event) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Event not found",
        });
      }

      event.subEvents.push(subEvent as any);
      await event.save();

      const added = event.toObject().subEvents.at(-1); // assume pushed to end
      if (!added) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Sub-event not added",
        });
      }

      return added;
    }),

  /**
   * Update sub-event
   * @summary Admin-only: patch an existing sub-event
   * @description Merges supplied changes into the sub-event and returns the updated version.
   */
  mutateById: authedProcedure
    .meta({
      description:
        "Admin-only mutation to update a sub-event by ID and return the modified document.",
    })
    .use(hasRole([ROLES.ADMIN]))
    .input(
      z.object({
        eventId: z.string().min(1).describe("[Event] Unique ID"),
        subEventId: z
          .string()
          .min(1)
          .describe("[SubEvent] Unique ID within Event"),
        changes: subEventTypeSchema
          .partial()
          .strict()
          .describe("Only supply changed to be made, all fields optional"),
      }),
    )
    .output(subEventTypeSchema.strict())
    .mutation(async (opts) => {
      const { eventId, subEventId, changes } = opts.input;
      const event = await eventModel.findById(eventId);

      if (!event) {
        console.error(`Could not find event with id: ${eventId}`);
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Could not find the event with provided id",
        });
      }

      const subEvent: HydratedDocument<SubEvent> | undefined =
        event.subEvents.find(
          (se): se is HydratedDocument<SubEvent> =>
            se._id.toString() === subEventId,
        );
      if (!subEvent) {
        console.error(`Sub-event with id ${subEventId} not found`);
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Sub-event with provided name not found",
        });
      }

      Object.assign(subEvent, changes);
      await event.save();

      return subEvent.toObject();
    }),

  /**
   * Delete sub-event
   * @summary Admin-only: remove a sub-event
   * @description Pulls the sub-event from the parent event’s array. Returns void.
   */
  deleteById: authedProcedure
    .meta({
      description: "Admin-only mutation to delete a sub-event by ID.",
    })
    .use(hasRole([ROLES.ADMIN]))
    .input(
      z.object({
        eventId: z.string().min(1).describe("[Event] Unique ID"),
        subEventId: z
          .string()
          .min(1)
          .describe("[SubEvent] Unique ID within Event"),
      }),
    )
    .output(z.void())
    .mutation(async (opts) => {
      const { eventId, subEventId } = opts.input;

      const updated = await eventModel.findByIdAndUpdate(
        eventId,
        { $pull: { subEvents: { _id: new Types.ObjectId(subEventId) } } },
        { new: true },
      );

      if (!updated) {
        console.error(`Could not find event with id: ${eventId}`);
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Could not find the event with provided id",
        });
      }
    }),
};
