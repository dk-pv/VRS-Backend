const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["video", "image"],
      required: true,
    },
    videoUrl: String,
    images: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hero", heroSchema);
