const mongoose = require("mongoose");

const appSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    version: String,
    rating: { type: Number, default: 0 },
    downloads: { type: Number, default: 0 },
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        comment: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("App", appSchema);
