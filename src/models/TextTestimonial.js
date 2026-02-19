const mongoose = require("mongoose");

const textTestimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 5,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "TextTestimonial",
  textTestimonialSchema
);
