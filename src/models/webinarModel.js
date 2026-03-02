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

    // ✅ REAL DATE & TIME
    startDateTime: {
      type: Date,
      required: true,
    },

    // ✅ BASE TIMEZONE
    australiaTimeZone: {
      type: String,
      required: true,
      enum: [
        "Australia/Perth",
        "Australia/Darwin",
        "Australia/Brisbane",
        "Australia/Sydney",
        "Australia/Melbourne",
        "Australia/Adelaide",
        "Australia/Hobart",
      ],
    },

    durationMinutes: {
      type: Number,
      default: 60,
    },

    meetLink: {
      type: String,
      required: true,
    },

    recordingLink: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Webinar", webinarSchema);
