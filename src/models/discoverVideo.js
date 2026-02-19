const mongoose = require("mongoose");

const discoverVideoSchema = new mongoose.Schema(
  {
    thumbnail: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "DiscoverVideo",
  discoverVideoSchema
);
