const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require ('../models/User');
const tourGuideSchema = new Schema(
  {
    mobileNumber: {
      type: String,
      required: true,
    },

    experienceYears: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);
const TourGuide = User.discriminator('tour guide', tourGuideSchema);
module.exports = TourGuide;
