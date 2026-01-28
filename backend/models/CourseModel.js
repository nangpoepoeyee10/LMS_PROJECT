const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    media: {
      videos: [{ type: String }], // URLs or file paths
      audios: [{ type: String }],
      images: [{ type: String }],
    },
    quizzes: [
      {
        question: String,
        options: [String],
        answer: String,
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Course", courseSchema);
