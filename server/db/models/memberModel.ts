import {
  facultyOptions,
  paymentMethodOptions,
  termOptions,
  tokenPurposeOptions,
} from "@/constants/member";
import { Schema, model, models } from "mongoose";
import type { Model } from "mongoose";
import { Member } from "../schemas/member";
import { roleOptions } from "@/constants/roles";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";

const memberSchema = new Schema<Member>(
  {
    username: {
      type: String,
      required: [true, "Please add the user name"],
    },
    email: {
      type: String,
      required: [true, "Please add the user Waterloo email address"],
      unique: [true, "Waterloo Email already exists"],
    },
    password: {
      type: String,
      required: [true, "Please add the user password"],
    },
    userStatus: {
      type: String,
      enum: roleOptions,
      required: [true, "Please add the user's status"],
      default: "member",
    },
    hasPaid: {
      type: Boolean,
      required: [true, "Please add whether the user has paid or not"],
      default: false,
    },
    watIAM: {
      type: String,
    },
    faculty: {
      type: String,
      required: [true, "Please add the user faculty"],
      enum: facultyOptions,
    },
    term: {
      type: String,
      required: [true, "Please add the user term"],
      enum: termOptions,
    },
    heardFromWhere: {
      type: String,
      required: [true, "Please add where the user heard about us from"],
      default: "",
    },
    paymentMethod: {
      type: String,
      enum: paymentMethodOptions,
      validate: {
        validator: function (this: any, value: string) {
          if (this.hasPaid && !value) {
            return false;
          }
          return true;
        },
        message: "You need a payment method if a user has paid",
      },
    },
    paymentLocation: {
      type: String,
      validate: {
        validator: function (this: any, value: string) {
          if (this.hasPaid && !value) {
            return false;
          }
          return true;
        },
        message: "You need a payment location if a user has paid",
      },
    },
    verifier: {
      type: String,
      validate: {
        validator: function (this: any, value: string) {
          if (this.hasPaid && !value) {
            return false;
          }
          return true;
        },
        message: "You need a payment verifier if a user has paid",
      },
    },
    isEmailVerified: {
      type: Boolean,
      required: [true, "Please add if the user's email is verified"],
      default: false,
    },
    memberIdeas: {
      type: String,
    },
    token: {
      hash: {
        type: String,
        default: "",
      },
      expires: {
        type: Date,
        default: null,
      },
      purpose: {
        type: String,
        enum: tokenPurposeOptions,
        default: "",
      },
    },
  },
  {
    timestamps: true,
  },
);

memberSchema.pre("save", async function (next) {
  const Event = model("events");
  if (!this.isNew) {
    return;
  }

  const openEventIds = await Event.find(
    {
      $or: [
        {
          startTime: {
            $gte: new Date(),
          },
        },
        {
          $and: [
            {
              startTime: {
                $lt: new Date(),
              },
              endTime: {
                $gte: new Date(),
              },
            },
          ],
        },
      ],
      isRegistrationRequired: false,
    },
    { _id: 1 },
  );

  openEventIds.forEach(async (eventId) => {
    const newRegistrant = { user: this._id, checkedIn: false, selected: true };

    await Event.updateOne(
      { _id: eventId },
      { $push: { registrants: newRegistrant } },
    );
  });

  next();
});

memberSchema.virtual("id").get(function () {
  return this._id.toString();
});

memberSchema.set("toObject", { virtuals: true });
memberSchema.set("toJSON", { virtuals: true });

memberSchema.plugin(mongooseLeanVirtuals);

const memberModel: Model<Member> =
  models.users || model<Member>("users", memberSchema);
export { memberSchema, memberModel };
