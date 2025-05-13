/**
 * Event CRUD & query procedures for the UWDSC TRPC API.
 * Each procedure includes JSDoc plus `.meta({ description })`
 * so trpc‑ui can auto‑generate readable docs (no summary/tags in meta).
 */
import { authedProcedure, hasRole, publicProcedure } from "../../trpc";
import { z } from "zod";
import { eventModel } from "@/server/db/models/eventModel";

import { ROLES } from "@/constants/roles";
import { EventTypeSchema } from "@/server/db/schemas/event";
import { TRPCError } from "@trpc/server";

export const eventProcedures = {
  /**
   * Public events
   * @summary List public‑facing event summaries for a date range
   * @description Returns name, description, location, time window and requirements for events whose buffered time range intersects the interval [`from`, `to`].
   */
  getByDateTimePublic: publicProcedure
    .meta({
      description:
        "Return basic details of events whose buffered time range intersects the given ISO date interval. No authentication required.",
    })
    .input(
      z
        .object({
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
        EventTypeSchema.pick({
          name: true,
          description: true,
          location: true,
          startTime: true,
          endTime: true,
          requirements: true,
        }).strict(),
      ),
    )
    .query(async (opts) => {
      const { from, to } = opts.input;
      return (await eventModel
        .find()
        .byDateRange(from, to)
        .select({
          _id: 0,
          name: 1,
          description: 1,
          location: 1,
          startTime: 1,
          endTime: 1,
          requirements: 1,
        })
        .lean()) as any;
    }),

  /**
   * Admin events by time
   * @summary List events (admin view) for a date range
   * @description Admin‑only endpoint that returns events occurring within the specified buffered window or on a single day.
   */
  getByDateTime: authedProcedure
    .meta({
      description:
        "Admin-only query to fetch events within a buffered date range or on a specific day.",
    })
    .use(hasRole([ROLES.ADMIN]))
    .input(
      z
        .object({
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
    .output(
      z.array(
        EventTypeSchema.omit({ registrants: true, subEvents: true }).strict(),
      ),
    )
    .query(async (opts) => {
      const { from, to } = opts.input;
      let results;

      if (from && to) {
        if (from.getTime() === to.getTime()) {
          results = await eventModel
            .find()
            .eventsHappeningOnBuffered(from)
            .select({
              registrants: 0,
              subEvents: 0,
              __v: 0,
            })
            .lean();
        } else {
          results = await eventModel
            .find()
            .byDateRange(from, to)
            .select({
              registrants: 0,
              subEvents: 0,
              __v: 0,
            })
            .lean();
        }
      } else if (from) {
        results = await eventModel
          .find()
          .eventsHappeningAfter(from)
          .select({
            registrants: 0,
            subEvents: 0,
            __v: 0,
          })
          .lean();
      } else if (to) {
        results = await eventModel
          .find()
          .eventsHappeningBefore(to)
          .select({
            registrants: 0,
            subEvents: 0,
            __v: 0,
          })
          .lean();
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
   * Get event(s)
   * @summary Fetch one or more events by ID
   * @description Admin‑only. Pass `retrieveAll=true` to fetch every event, or supply an array of IDs. Registrants and subEvents are stripped.
   */
  getById: authedProcedure
    .meta({
      description:
        "Admin-only endpoint to fetch specific events or all events with sensitive fields removed.",
    })
    .use(hasRole([ROLES.ADMIN]))
    .input(
      z
        .object({
          ids: z.array(z.string().min(1)).describe("[Event] unique ID"),
          retrieveAll: z
            .boolean()
            .optional()
            .describe("If you want to retrieve all events"),
        })
        .strict(),
    )
    .output(
      z.array(
        EventTypeSchema.omit({ registrants: true, subEvents: true }).strict(),
      ),
    )
    .query(async (opts) => {
      const { ids, retrieveAll } = opts.input;
      let result;

      if (retrieveAll) {
        // No ids supplied – treat as fetch‑all
        result = await eventModel
          .find({})
          .select({
            registrants: 0,
            subEvents: 0,
            __v: 0,
          })
          .lean();
      } else {
        result = await eventModel
          .find({ _id: { $in: ids } })
          .select({
            registrants: 0,
            subEvents: 0,
            __v: 0,
          })
          .lean();
      }

      // When caller expects specific ids, ensure every id was found
      if (!retrieveAll && ids.length > 0 && result.length !== ids.length) {
        const idsNotFound = ids.filter(
          (id) => !result.map((evt) => evt._id.toString()).includes(id),
        );

        console.error(`Could not find event/s with ids: ${idsNotFound}`);
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Could not find some of the ids provided.",
        });
      }

      return result;
    }),

  /**
   * Create event
   * @summary Admin‑only: add a new event
   * @description Persists a new event document and returns the full object minus Mongoose metadata.
   */
  create: authedProcedure
    .meta({
      description:
        "Admin-only mutation to create an event and return the saved document without internal fields.",
    })
    .use(hasRole([ROLES.ADMIN]))
    .input(
      EventTypeSchema.omit({
        _id: true,
        createdAt: true,
        updatedAt: true,
      }).strict(),
    )
    .output(EventTypeSchema.strict())
    .mutation(async (opts) => {
      console.log(opts.input);
      const event = (await eventModel.create(opts.input)).toObject() as any;

      delete event.__v;
      delete event.id;

      return event;
    }),

  /**
   * Update event
   * @summary Admin‑only: patch an existing event
   * @description Applies partial changes to an event and returns the updated document.
   */
  mutateById: authedProcedure
    .meta({
      description:
        "Admin-only mutation to update an event record by ID and return the modified document.",
    })
    .use(hasRole([ROLES.ADMIN]))
    .input(
      z
        .object({
          id: z.string().min(1).describe("[Event] Unique ID"),
          changes: EventTypeSchema.omit({
            _id: true,
            createdAt: true,
            updatedAt: true,
          })
            .partial()
            .strict()
            .describe("Only supply changed to be made, all fields optional"),
        })
        .strict(),
    )
    .output(EventTypeSchema.strict())
    .mutation(async (opts) => {
      const { id, changes } = opts.input;
      const existingEvent = await eventModel.findById(id);

      if (!existingEvent) {
        console.error(`Could not find event with id: ${id}`);
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Could not find the event with provided id",
        });
      }

      const savedEvent = (
        await existingEvent.set({ ...changes }).save()
      ).toObject() as any;

      delete savedEvent.__v;
      delete savedEvent.id;

      return savedEvent;
    }),

  /**
   * Delete event
   * @summary Admin‑only: remove an event
   * @description Deletes the specified event. Returns void.
   */
  deleteById: authedProcedure
    .meta({
      description: "Admin-only mutation to delete an event by ID.",
    })
    .use(hasRole([ROLES.ADMIN]))
    .input(
      z
        .object({ id: z.string().min(1).describe("[Event] Unique ID") })
        .strict(),
    )
    .output(z.void())
    .mutation(async (opts) => {
      const { id } = opts.input;
      const existingEvent = await eventModel.findById(id);

      if (!existingEvent) {
        console.error(`Could not find event with id: ${id}`);
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Could not find the event with provided id",
        });
      }

      await existingEvent.deleteOne();
    }),
};
