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
      required: [true, "Please add the member's name"],
    },
    email: {
      type: String,
      required: [true, "Please add the member's Waterloo email address"],
      unique: [true, "Waterloo Email already exists"],
    },
    password: {
      type: String,
      required: [true, "Please add the member's password"],
    },
    role: {
      type: String,
      enum: roleOptions,
      required: [true, "Please add the member's status"],
      default: "member",
    },
    hasPaid: {
      type: Boolean,
      required: [true, "Please add whether the member has paid or not"],
      default: false,
    },
    watIAM: {
      type: String,
      unique: [true, "WatIAM already exists"],
    },
    faculty: {
      type: String,
      required: [true, "Please add the member's faculty"],
      enum: facultyOptions,
    },
    term: {
      type: String,
      required: [true, "Please add the member's term"],
      enum: termOptions,
    },
    heardFromWhere: {
      type: String,
      required: [true, "Please add where the member heard about us from"],
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
        message: "You need a payment method if a member has paid",
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
        message: "You need a payment location if a member has paid",
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
        message: "You need a payment verifier if a member has paid",
      },
    },
    isEmailVerified: {
      type: Boolean,
      required: [true, "Please add if the member's email is verified"],
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
        default: new Date(),
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
    const newRegistrant = {
      member: this._id,
      checkedIn: false,
      selected: true,
    };

    await Event.updateOne(
      { _id: eventId },
      { $push: { registrants: newRegistrant } },
    );
  });

  next();
});

memberSchema.plugin(mongooseLeanVirtuals);

const memberModel: Model<Member> =
  models.members || model<Member>("members", memberSchema);

if (process.env.NODE_ENV === "development" && models.events) {
  delete models.events;
}

export { memberSchema, memberModel };
