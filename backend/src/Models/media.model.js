import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema({
  jobId: String,
  title: String,
  url: String,
  thumbnail: String,

  format: String,
  quality: String,

  fileUrl: String,

  status: {
    type: String,
    enum: ["processing", "completed"],
    default: "processing",
  },

  summary: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Media", mediaSchema);