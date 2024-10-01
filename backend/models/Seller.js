const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require('../models/User');
const sellerSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);
const Seller = User.discriminator('Seller', sellerSchema);
module.exports = Seller;