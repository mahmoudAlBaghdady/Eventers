import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
    },
    createdEvents: [
      {
        type: Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
    bookedEvents: [
      {
        type: Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model("User", UserSchema);
