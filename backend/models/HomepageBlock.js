const mongoose = require("mongoose");

const homepageBlockSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // e.g., "Popular Courses"
    description: { type: String }, // optional description
    type: {
      type: String,
      enum: ["popular", "editor", "custom"],
      required: true,
    }, // block type
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }], // courses in the block
  },
  { timestamps: true },
);

module.exports = mongoose.model("HomepageBlock", homepageBlockSchema);
