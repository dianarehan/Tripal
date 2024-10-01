const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define the base schema for the User
const baseOptions = {
  discriminatorKey: 'role',  // Discriminator key
  collection: 'users',       // Collection name
};

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['seller', 'advertiser', 'admin', 'tour guide', 'tourist','tourism governor'],
    //default: 'seller',  
  },
  accepted: {
    type: Boolean,
    default: false,
  }
}, baseOptions);

// Create the base User model
const User = mongoose.model('User', userSchema);
module.exports = User;