const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productReviewSchema = new Schema({
  rating: {
    type: Number,
    required: true
  },
  userID: {
    type: String,
    required: true
  },
  productID: {
    type: Schema.Types.ObjectId, 
    ref: 'Product',
    required: true
  },
  review: {
    type: String,
  }
}, { timestamps: true });

productReviewSchema.index({ userID: 1, productID: 1 }, { unique: true });

const ProductReview = mongoose.model('ProductReview', productReviewSchema);
module.exports = ProductReview;
