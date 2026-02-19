const mongoose = require("mongoose");

const propertyShowcaseSchema = new mongoose.Schema(
  {
    images: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "PropertyShowcase",
  propertyShowcaseSchema
);
