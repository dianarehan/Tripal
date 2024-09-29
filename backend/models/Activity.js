const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  advertiser: {
    type: String,  
    required: true,
    ref: 'Advertiser'  
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  location: {
    type: String,  //integrate Google Maps API here!!!!!!!!!!!!!!!!!!!
    required: true
  },
  priceRange: {
    type: String, //to store price or range
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,  
    ref: 'activityCategory',  
    required: true
  },
  tags: [{
    type: Schema.Types.ObjectId,  
    ref: 'preferenceTag' 
  }],
  specialDiscounts: {
    type: String
  },
  isBookingOpen: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const Activity = mongoose.model('Activity', activitySchema);
module.exports = Activity;