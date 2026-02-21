const mongoose = require("mongoose");

const securedPropertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    // Cover image (card only)
    coverImage: {
      type: String,
      required: true,
    },

    // Gallery images (modal slider)
    galleryImages: [
      {
        type: String,
      },
    ],

    description: {
      type: String,
      required: true,
    },

    securedPrice: {
      type: String,
      required: true,
    },

    marketPrice: {
      type: String,
      required: true,
    },

    currentPrice: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "SecuredProperty",
  securedPropertySchema
);