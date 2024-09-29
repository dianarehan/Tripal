const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TourismGovernorSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const TourismGovernor = mongoose.model(
  "TourismGovernor",
  TourismGovernorSchema
);

module.exports = TourismGovernor;
