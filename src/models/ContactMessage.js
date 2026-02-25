const mongoose = require("mongoose");

const contactMessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    australiaDuration: {
      type: String,
      trim: true,
    },
    mortgageYears: {
      type: String,
      trim: true,
    },
    baPreference: {
      type: String,
      trim: true,
    },
    agree: {
      type: Boolean,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContactMessage", contactMessageSchema);