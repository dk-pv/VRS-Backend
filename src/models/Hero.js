const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["video", "image"],
      required: true,
    },

    video: {
      url: String,
      public_id: String,
    },

    images: [
      {
        url: String,
        public_id: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hero", heroSchema);