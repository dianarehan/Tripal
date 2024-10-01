const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require ('../models/User');
const touristSchema = new Schema(
  {
    mobileNumber: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    job: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Tourist = User.discriminator('tourist', touristSchema);
module.exports = Tourist;
