const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const sellerSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: false,
      default: ''
    },

    description: {
      type: String,
      required: false,
      default: ''
    }
  },
  { timestamps: true }
);
const Seller = mongoose.model('Seller', sellerSchema);
module.exports = Seller;