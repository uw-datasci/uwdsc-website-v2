import { Schema, model, models, Model } from "mongoose";
import type { QueryWithHelpers } from "mongoose";
import { v4 as uuidv4 } from "uuid";

import { TypeConstant, typeConstants } from "../../../constants/types";
import { addMinutes } from "date-fns";
import { statusOptions } from "@/constants/registrants";
import { memberTypeSchema } from "../schemas/member";
import { Event } from "../schemas/event";

/** Typed query‑helper signatures for the Event model */
interface EventQueryHelpers {
  byDateRange(
    this: QueryWithHelpers<Event[], Event, EventQueryHelpers>,
    start: Date,
    end: Date,
  ): QueryWithHelpers<Event[], Event, EventQueryHelpers>;

  eventsHappeningOn(
    this: QueryWithHelpers<Event[], Event, EventQueryHelpers>,
    dateTime: Date,
  ): QueryWithHelpers<Event[], Event, EventQueryHelpers>;

  eventsHappeningOnBuffered(
    this: QueryWithHelpers<Event[], Event, EventQueryHelpers>,
    dateTime: Date,
  ): QueryWithHelpers<Event[], Event, EventQueryHelpers>;

  eventsHappeningBefore(
    this: QueryWithHelpers<Event[], Event, EventQueryHelpers>,
    dateTime: Date,
  ): QueryWithHelpers<Event[], Event, EventQueryHelpers>;

  eventsHappeningAfter(
    this: QueryWithHelpers<Event[], Event, EventQueryHelpers>,
    dateTime: Date,
  ): QueryWithHelpers<Event[], Event, EventQueryHelpers>;
}

const eventSchema = new Schema<
  Event,
  Model<Event, EventQueryHelpers>,
  {},
  EventQueryHelpers
>(
  {
    // Basic information for event
    name: {
      type: String,
      required: true,
    },
    isRegistrationRequired: {
      type: Boolean,
      required: true,
      immutable: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    bufferedStartTime: {
      type: Date,
      required: true,
    },
    bufferedEndTime: {
      type: Date,
      required: true,
    },

    // Sensitve information for event
    // Used for QR payload
    secretName: {
      type: String,
      required: true,
      unique: [true, "secretName needs to be unique"],
      immutable: true,
      default: () => {
        return uuidv4();
      },
    },

    // Requirements for users to be checked-in
    requirements: {
      type: new Schema(
        {
          member: {
            type: Schema.Types.Mixed,
            default: { hasPaid: true },
            validate: {
              validator: (member: Record<string, unknown>) => {
                return memberTypeSchema.partial().strict().safeParse(member)
                  .success;
              },
              message: "member in requirements must follow the member schema",
            },
          },
          selected: {
            type: Boolean,
          },
          registrant: {
            type: Schema.Types.Mixed,
          },
        },
        { _id: false },
      ),
      required: true,
    },

    // What to display to admins during check-in
    toDisplay: {
      type: new Schema({
        before: {
          type: new Schema(
            {
              member: {
                type: Schema.Types.Mixed,
                required: true,
                default: {
                  username: "Name",
                  hasPaid: "Paid fee",
                },
                validate: {
                  validator: (member: Record<string, unknown>) => {
                    return memberTypeSchema.partial().strict().safeParse(member)
                      .success;
                  },
                  message:
                    "member in requirements must follow the member schema",
                },
              },
              checkedIn: {
                type: String,
                default: "Checked In",
              },
              selected: {
                type: String,
              },
              registrant: {
                type: Schema.Types.Mixed,
              },
            },
            { _id: false },
          ),
          required: true,
        },
        after: {
          type: new Schema(
            {
              member: {
                type: Schema.Types.Mixed,
                required: true,
                default: {
                  username: "Name",
                  hasPaid: "Paid fee",
                },
                validate: {
                  validator: (member: Record<string, unknown>) => {
                    return memberTypeSchema.partial().strict().safeParse(member)
                      .success;
                  },
                  message:
                    "member in requirements must follow the member schema",
                },
              },
              checkedIn: {
                type: String,
                default: "Checked In",
              },
              selected: {
                type: String,
              },
              registrant: {
                type: Schema.Types.Mixed,
              },
            },
            { _id: false },
          ),
          required: true,
        },
      }),
      required: [true, "Please provide what to display before/after check-in"],
    },

    // Schema of additional fields, for now mainly for admin panel
    additionalFieldsSchema: {
      type: Schema.Types.Mixed,
    },

    // All members that have registered for this event
    registrants: {
      type: [
        {
          _id: false,
          memberId: {
            type: Schema.Types.ObjectId,
            ref: "members",
            required: true,
          },
          checkedIn: {
            type: Boolean,
            default: false,
            required: true,
          },
          selected: {
            type: Boolean,
            default: false,
            required: true,
          },
          status: {
            type: String,
            default: "Applied",
            enum: statusOptions,
          },
          additionalFields: {
            type: Map,
            of: Schema.Types.Mixed,
          },
        },
      ],
      required: true,
      default: [],
    },

    subEvents: {
      type: [
        {
          name: {
            type: String,
            required: true,
          },
          description: {
            type: String,
            required: true,
          },
          location: {
            type: String,
            required: true,
          },
          startTime: {
            type: Date,
            required: true,
          },
          endTime: {
            type: Date,
            required: true,
          },
          bufferedStartTime: {
            type: Date,
            required: true,
          },
          bufferedEndTime: {
            type: Date,
            required: true,
          },
          checkedIn: {
            type: [Schema.Types.ObjectId],
            ref: "members",
            required: true,
            default: [],
          },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
    query: {
      byDateRange(start: Date, end: Date) {
        return this.find({ startTime: { $gte: start, $lte: end } });
      },
      eventsHappeningOn(dateTime: Date) {
        return this.find({
          startTime: { $lte: dateTime },
          endTime: { $gte: dateTime },
        });
      },
      eventsHappeningOnBuffered(dateTime: Date) {
        return this.find({
          bufferedStartTime: { $lte: dateTime },
          bufferedEndTime: { $gte: dateTime },
        });
      },
      eventsHappeningBefore(dateTime: Date) {
        return this.find({ startTime: { $lte: dateTime } });
      },
      eventsHappeningAfter(dateTime: Date) {
        return this.find({ startTime: { $gte: dateTime } });
      },
    },
  },
);

function validateJsonAgainstSchema(
  data: Record<string, unknown>,
  schema: Record<string, TypeConstant>,
): boolean {
  const schemaKeys = Object.keys(schema);
  const dataKeys = Object.keys(data);

  // Check if data has any keys not in schema
  if (dataKeys.some((key) => !schemaKeys.includes(key))) {
    return false;
  }

  return schemaKeys.every((key) => {
    if (!(key in data)) return false;

    const value = data[key];
    switch (schema[key]) {
      case "string":
        return typeof value === "string";
      case "number":
        return typeof value === "number";
      case "boolean":
        return typeof value === "boolean";
      case "array":
        return Array.isArray(value);
      default:
        return false;
    }
  });
}

eventSchema.pre("validate", function (next) {
  const registrantChecks = [
    {
      path: "toDisplay.before.registrant",
      value: this.toDisplay.before.registrant,
    },
    {
      path: "toDisplay.after.registrant",
      value: this.toDisplay.after.registrant,
    },
    { path: "requirements.registrant", value: this.requirements.registrant },
  ];

  for (const { path, value } of registrantChecks) {
    if (
      this.additionalFieldsSchema &&
      value &&
      !validateJsonAgainstSchema(value, this.additionalFieldsSchema)
    ) {
      return next(
        new Error(`${path} does not match the additionalFieldSchema set`),
      );
    } else if (!this.additionalFieldsSchema && value) {
      return next(
        new Error(
          `additionalFieldSchema was not set, but you are trying to access a value`,
        ),
      );
    }
  }

  // ---------- Time consistency checks ----------
  if (!this.bufferedStartTime)
    this.bufferedStartTime = addMinutes(this.startTime, -20);

  if (!this.bufferedEndTime)
    this.bufferedEndTime = addMinutes(this.endTime, 20);

  if (this.startTime && this.endTime && this.startTime >= this.endTime) {
    return next(new Error("Start time must be before end time"));
  }

  if (
    this.bufferedStartTime &&
    this.startTime &&
    this.bufferedStartTime > this.startTime
  ) {
    return next(new Error("Buffered start time must be <= start time"));
  }

  if (
    this.bufferedEndTime &&
    this.endTime &&
    this.bufferedEndTime < this.endTime
  ) {
    return next(new Error("Buffered end time must be >= end time"));
  }

  // Subevent timing constraints
  for (let i = 0; i < (this.subEvents ?? []).length; i++) {
    const sub = this.subEvents[i];

    // ----- Auto‑fill buffered start/end if missing -----
    if (!sub.bufferedStartTime) {
      sub.bufferedStartTime = addMinutes(sub.startTime, -20);
      this.markModified(`subEvents.${i}.bufferedStartTime`);
    }

    if (!sub.bufferedEndTime) {
      sub.bufferedEndTime = addMinutes(sub.endTime, 20);
      this.markModified(`subEvents.${i}.bufferedEndTime`);
    }

    // ----- Consistency checks -----
    if (sub.startTime <= this.startTime) {
      return next(
        new Error(
          "A subevent's start time must be after the main event's start time",
        ),
      );
    }
    console.log("testtest")
    if (sub.endTime >= this.endTime) {
      return next(
        new Error(
          "A subevent's end time must be before the main event's end time",
        ),
      );
    }

    if (sub.endTime <= sub.startTime) {
      return next(
        new Error(
          "A subevent's end time must be after the subevent's start time",
        ),
      );
    }
  }
  // ---------- End time consistency checks ----------

  if (!this.isRegistrationRequired && this.subEvents.length > 0) {
    return next(
      new Error("Only events that require registration can have sub-events!"),
    );
  }

  next();
});

eventSchema.pre("save", async function (next) {
  const Member = model("members");

  if (!this.isRegistrationRequired) {
    const allMembers = await Member.find();
    this.registrants.splice(0, this.registrants.length);
    allMembers.forEach((member) => {
      this.registrants.push({
        memberId: member._id,
        selected: true,
        checkedIn: false,
      });
    });
  }

  next();
});

eventSchema.index({ secretName: 1 }, { unique: true });
eventSchema.index({ startTime: 1 });

const eventModel: Model<Event, EventQueryHelpers> =
  (models.events as Model<Event, EventQueryHelpers>) ||
  model<Event, EventQueryHelpers>("events", eventSchema);

if (process.env.NODE_ENV === "development" && models.events) {
  delete models.events;
}

export { eventSchema, eventModel };
