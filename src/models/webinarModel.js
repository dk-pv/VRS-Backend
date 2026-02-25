const mongoose = require("mongoose");

const webinarSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    // ✅ Day (Monday, Tuesday, etc.)
    day: {
      type: String,
      required: true,
    },

    // ✅ Time (24hr format recommended: "19:30")
    time: {
      type: String,
      required: true,
    },

    durationMinutes: {
      type: Number,
      default: 60,
    },

    meetLink: {
      type: String,
      required: true,
    },

    recordingLink: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Webinar", webinarSchema);