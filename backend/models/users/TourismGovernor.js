const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TourismGovernorSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    }

  },
  { timestamps: true }
);

const TourismGovernor = mongoose.model(
  "TourismGovernor",
  TourismGovernorSchema
);
module.exports = TourismGovernor;
