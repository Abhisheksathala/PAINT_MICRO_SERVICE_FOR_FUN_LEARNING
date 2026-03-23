import mongoose from "mongoose";

const uploadShema = new mongoose.Schema(
  {
    userId: String,
    name: String,
    cloudinaryId: String,
    url: String,
    mimeType: String,
    size: Number,
    width: Number,
    height: Number,
  },
  { timestamps: true },
);

const uploadModel =
  mongoose.models.Media || mongoose.model("Media", uploadShema);

export default uploadModel;
