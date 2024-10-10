const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    sparse: true
  },
  role: {
    type: String,
    required: true,
    enum: ["Tour Guide", "Advertiser", "Seller", "Tourist", "Tourism Governor", "Admin"],
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
