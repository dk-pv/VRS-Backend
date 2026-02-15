const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    homeBanner: String,
    showcaseYoutubeLink: String,
    aboutImage: String,
    contactEmail: String,
    contactPhone: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Settings", settingsSchema);
