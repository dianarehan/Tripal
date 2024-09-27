const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const preferenceTagSchema = new Schema ({
    Name:{
        type: String,
        required: true
    },

}, {timestamps: true});

const preferenceTag = mongoose.model('preferenceTag', preferenceTagSchema);
module.exports = preferenceTag;
