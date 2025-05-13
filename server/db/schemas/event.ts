import z from "zod";
import { memberDisplayTypeSchema, memberTypeSchema } from "./member";
import { typeConstants } from "@/constants/types";
import { statusOptions } from "@/constants/registrants";
import { zObjectId } from "./util";

export const populatedRegistrantTypeSchema = z.object({
  member: memberTypeSchema.describe(
    "[Registrant] Member object populated from pre-existing memberId",
  ),
  checkedIn: z
    .boolean()
    .describe("[Registrant] If they have checkedIn to the main event"),
  selected: z.boolean().describe("[Registrant] If they were selected"),
  status: z
    .enum(statusOptions)
    .optional()
    .describe("[Registrant] Their application status"),
  additionalFields: z
    .record(z.unknown())
    .optional()
    .describe("[Registrant] Additional fields collected from registration"),
});

export type PopulatedRegistrant = z.infer<typeof populatedRegistrantTypeSchema>;

export const registrantTypeSchema = z.object({
  memberId: zObjectId.describe("[Member] Unique ID"),
  checkedIn: z
    .boolean()
    .describe("[Registrant] If they have checkedIn to the main event"),
  selected: z.boolean().describe("[Registrant] If they were selected"),
  status: z
    .enum(statusOptions)
    .optional()
    .describe("[Registrant] Their application status"),
  additionalFields: z
    .record(z.unknown())
    .optional()
    .describe("[Registrant] Additional fields collected from registration"),
});

export type Registrant = z.infer<typeof registrantTypeSchema>;

export const subEventTypeSchema = z.object({
  _id: zObjectId.describe("[SubEvent] Unique ID within an Event"),
  name: z.string().describe("[SubEvent] Name"),
  description: z.string().describe("[SubEvent] Description"),
  location: z.string().describe("[SubEvent] Location"),
  startTime: z.coerce.date().describe("[SubEvent] Actual start time"),
  endTime: z.coerce.date().describe("[SubEvent] Actial end time"),
  bufferedStartTime: z.coerce
    .date()
    .optional()
    .describe(
      "[SubEvent] Start time that is used for current querries, see docs",
    ),
  bufferedEndTime: z.coerce
    .date()
    .optional()
    .describe(
      "[SubEvent] End time that is used for current querries, see docs",
    ),
  checkedIn: z
    .array(zObjectId)
    .describe("[SubEvent] List of Member IDs that have checked in"),
});

export type SubEvent = z.infer<typeof subEventTypeSchema>;

export const EventTypeSchema = z.object({
  _id: zObjectId.describe("[Event] Unique ID"),
  name: z.string().describe("[Event] Name"),
  isRegistrationRequired: z
    .boolean()
    .describe("[Event] Is additional registration required, see docs"),
  description: z.string().describe("[Event] Description"),
  location: z.string().describe("[Event] Location"),
  startTime: z.coerce.date().describe("[Event] Actual start time"),
  endTime: z.coerce.date().describe("[Event] Actual end time"),
  bufferedStartTime: z.coerce
    .date()
    .optional()
    .describe("[Event] Start time that is used for current querries, see docs"),
  bufferedEndTime: z.coerce
    .date()
    .optional()
    .describe("[Event] End time that is used for current querries, see docs"),
  secretName: z.string().describe("[Event] Screte string used in QR payload"),
  requirements: z
    .object({
      member: memberTypeSchema
        .omit({ token: true })
        .partial()
        .strict()
        .optional()
        .describe("[Requirements] Member object"),
      selected: z
        .boolean()
        .optional()
        .describe("[Requirements] Does a member need to be selected?"),
      registrant: z
        .any()
        .optional()
        .describe(
          "[Requirements] Additional fields collected from registration",
        ),
    })
    .describe(
      "[Event] JSON that defines requirements for members to be attached/checked in, see docs",
    ),
  toDisplay: z.object({
    before: z
      .object({
        member: memberDisplayTypeSchema
          .strict()
          .optional()
          .describe("[Event - to display BEFORE] Member object"),
        checkedIn: z
          .string()
          .optional()
          .describe("[Event - to display BEFORE] Should display checked in?"),
        selected: z
          .string()
          .optional()
          .describe("[Event - to display BEFORE] Should display selected ?"),
        registrant: z
          .any()
          .optional()
          .describe(
            "[Event - to display BEFORE] Should display additional fields collected from registration ?",
          ),
      })
      .describe("[Event] JSON that defines what to display before check in"),
    after: z
      .object({
        member: memberDisplayTypeSchema
          .strict()
          .optional()
          .describe("[Event - to display AFTER] Member object"),
        checkedIn: z
          .string()
          .optional()
          .describe("[Event - to display AFTER] Should display checked in?"),
        selected: z
          .string()
          .optional()
          .describe("[Event - to display AFTER] Should display selected ?"),
        registrant: z
          .any()
          .optional()
          .describe(
            "[Event - to display AFTER] Should display additional fields collected from registration ?",
          ),
      })
      .describe("[Event] JSON that defines what to display after check in"),
  }),
  additionalFieldsSchema: z
    .record(z.enum(typeConstants))
    .optional()
    .describe(
      "[Event] Schema for additional fields collected from registration",
    ),
  registrants: z
    .array(registrantTypeSchema)
    .describe("[Event] List of registrants"),
  subEvents: z.array(subEventTypeSchema).describe("[Event] List of sub events"),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Event = z.infer<typeof EventTypeSchema>;

// Maybe can split into registrant and eventDescription ? Restructuing optional
// Should split model schema into multiple parts to reflect this as well
