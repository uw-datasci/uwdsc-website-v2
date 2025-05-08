import { Schema, model, models } from "mongoose";
import type { CallbackWithoutResultAndOptionalError } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { mapKeysValidator, mapKeysErrorMessage } from "./util/validators";
import { TYPE_CONSTANTS } from "../../../constants/types";
import { addMinutes } from "date-fns";
import { memberSchema } from "./memberModel";

const eventSchema = new Schema(
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
    },
    location: {
      type: String,
    },
    startTime: {
      type: Date,
      required: true,
    },
    bufferedStartTime: {
      type: Date,
      required: true,
    },
    endTime: {
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
      immutable: true,
      default: () => {
        return uuidv4();
      },
    },

    // Requirements for users to be checked-in
    requirements: {
      type: Map,
      of: Schema.Types.Mixed,
      user: {
        type: Map,
        of: Schema.Types.Mixed,
      },
      checkedIn: {
        type: Boolean,
        default: false,
      },
      selected: {
        type: Boolean,
        default: true,
      },
      required: true,
    },

    // What to display to admins during check-in
    toDisplay: {
      type: Map,
      of: Schema.Types.Map,
      before: {
        type: Map,
        of: Schema.Types.Mixed,
        user: {
          type: Map,
          of: Schema.Types.Mixed,
          required: true,
        },
        checkedIn: {
          type: String,
          default: "Checked In",
        },
        selected: {
          type: String,
        },
        registrant: {
          type: Map,
          of: Schema.Types.Mixed,
          default: {},
        },
        required: true,
      },
      after: {
        type: Map,
        of: Schema.Types.Mixed,
        user: {
          type: Map,
          of: Schema.Types.Mixed,
          required: true,
        },
        checkedIn: {
          type: String,
          default: "Checked In",
        },
        selected: {
          type: String,
        },
        registrant: {
          type: Map,
          of: Schema.Types.Mixed,
          default: {},
        },
        required: true,
      },
      required: [true, "Please provide what to display before/after check-in"],
    },

    // Schema of additional fields, for now mainly for admin panel
    additionalFieldsSchema: {
      type: Map,
      of: {
        type: String,
        enum: [
          TYPE_CONSTANTS.ARRAY,
          TYPE_CONSTANTS.STRING,
          TYPE_CONSTANTS.NUMBER,
          TYPE_CONSTANTS.BOOL,
        ],
      },
      required: true,
      default: new Map([["checkedIn", false]]),
    },

    // All users that have registered for this event
    registrants: {
      type: [
        {
          _id: false,
          user: {
            type: Schema.Types.ObjectId,
            ref: "users",
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
            enum: [
              "Accepted",
              "Confirmed",
              "Waitlist",
              "Rejected",
              "Expired",
              "Applied",
            ],
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
          bufferedStartTime: {
            type: Date,
            required: true,
          },
          endTime: {
            type: Date,
            required: true,
          },
          bufferedEndTime: {
            type: Date,
            required: true,
          },
          checkedIn: {
            type: [Schema.Types.ObjectId],
            ref: "users",
            required: true,
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
      allEvents() {
        return this.find();
      },
    },
  },
);

/**
 * Validation function to ensure the map follows the schema and if not, throws and error
 */
const mapValidator = (
  schema: Schema,
  map: any,
  next: CallbackWithoutResultAndOptionalError,
): void => {
  if (map && !mapKeysValidator(schema)(map)) {
    const errorMessage = mapKeysErrorMessage(schema)({ value: map });
    return next(new Error(errorMessage));
  }
};

const convertInnerObjectsToMaps = (obj: any): any => {
  if (obj instanceof Map)
    return new Map([...obj].map(([k, v]) => [k, convertInnerObjectsToMaps(v)]));
  if (obj && typeof obj === "object" && !Array.isArray(obj)) {
    return new Map(
      Object.entries(obj).map(([key, value]) => [
        key,
        convertInnerObjectsToMaps(value),
      ]),
    );
  }
  return obj;
};

eventSchema.pre("validate", function (next) {
  // To fix
  const beforeMap = this.toDisplay?.get("before") ?? new Map();
  const afterMap = this.toDisplay?.get("after") ?? new Map();

  this.toDisplay = new Map([
    ["before", convertInnerObjectsToMaps(beforeMap)],
    ["after", convertInnerObjectsToMaps(afterMap)],
  ]);
  this.requirements.set(
    "user",
    new Map(Object.entries(this.requirements.get("user"))),
  );

  if (this.isNew && this.startTime < new Date()) {
    next(new Error("Start time must be before end time."));
  }

  if (this.startTime && this.endTime && this.startTime >= this.endTime) {
    return next(new Error("Start time must be before end time."));
  }

  const schemaDefinition: { [key: string]: { type: any } } = {};
  this.additionalFieldsSchema.forEach((type, key) => {
    schemaDefinition[key] = {
      type: type,
    };
  });

  const schema = new Schema(schemaDefinition);

  mapValidator(schema, this.toDisplay.get("before")?.get("registrant"), next);
  mapValidator(schema, this.toDisplay.get("after")?.get("registrant"), next);
  mapValidator(schema, this.requirements.get("registrant"), next);

  mapValidator(memberSchema, this.toDisplay.get("before")?.get("user"), next);
  mapValidator(memberSchema, this.toDisplay.get("after")?.get("user"), next);
  mapValidator(memberSchema, this.requirements.get("user"), next);

  if (!this.bufferedStartTime) {
    this.bufferedStartTime = addMinutes(this.startTime, -20);
  } else if (this.bufferedStartTime > this.startTime) {
    return next(new Error("bufferedStartTime must be before startTime"));
  }

  if (!this.bufferedEndTime) {
    this.bufferedEndTime = new Date(this.endTime);
  } else if (this.bufferedEndTime < this.endTime) {
    return next(new Error("bufferedEndTime must be after endTime"));
  }

  if (!this.isRegistrationRequired && this.subEvents.length > 0) {
    return next(
      new Error("Only events that require registration can have sub-events!"),
    );
  }

  next();
});

eventSchema.pre("save", async function (next) {
  const User = model("users");

  if (!this.isRegistrationRequired) {
    const allUsers = await User.find();
    this.registrants.splice(0, this.registrants.length);
    allUsers.forEach((user) => {
      this.registrants.push({
        user: user._id,
        selected: true,
        checkedIn: false,
      });
    });
  }

  next();
});

eventSchema.virtual("registrantCount").get(function () {
  if (this.registrants) {
    return this.registrants.length;
  } else {
    return 0;
  }
});

eventSchema.set("toJSON", { virtuals: true });
eventSchema.set("toObject", { virtuals: true });

eventSchema.index({ secretName: 1 }, { unique: true });
eventSchema.index({ startTime: 1 });

const eventModel = models.events || model("events", eventSchema);
export { eventSchema, eventModel };
