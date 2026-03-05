import mongoose from "mongoose";

const designSchema = new mongoose.Schema({
  userId: String,
  name: String,
  canvasData: String,
  width: Number,
  height: Number,
  category: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
}, {
  timestamps:true
});

const desigenModel = mongoose.model("Design",designSchema)

export default desigenModel
