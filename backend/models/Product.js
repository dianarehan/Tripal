const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  sellerID: {
    type: Schema.Types.ObjectId, 
    ref: 'Seller',
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  picture: {
    type: String,
    required: true
  }
}, { timestamps: true });

productSchema.index({ name: 1, sellerID: 1 }, { unique: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
