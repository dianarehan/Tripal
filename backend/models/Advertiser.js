const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require ('../models/User');
const advertiserSchema = new Schema(
  {
    companyLink: {
      type: String,
      required: true
    },

    hotline: {
      type: Number,
      required: true
    },

    companyProfile: {
      type: String,
      required: true
    }

  },
  { timestamps: true }
);

const Advertiser = User.discriminator('advertiser', advertiserSchema);
module.exports = Advertiser;
