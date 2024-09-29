const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activityCategorySchema = new Schema({
    Name: {
        type: String,
        required: true,
        unique: true
    }

}, { timestamps: true });

const activityCategory = mongoose.model('activityCategory', activityCategorySchema);
module.exports = activityCategory;