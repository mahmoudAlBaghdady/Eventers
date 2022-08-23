import { Schema, model } from "mongoose";
const ImageSchema = new Schema({
  url: String,
  public_id: String,
});

// ImageSchema.virtual('thumbnail').get(function () {
//   return this.url.replace('/upload', '/upload/w_200');
// });

const EventsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    brief: {
      type: String,
      required: true,
      maxlength: 128,
    },
    tickets: {
      type: Number,
      required: true,
    },
    images: [ImageSchema],
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default model("Event", EventsSchema);
