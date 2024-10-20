const mongoose = require('mongoose');

const ItineraryCommentSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    itineraryId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Itinerary', 
        required: true
    },
    text: {
        type: String,
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
});

module.exports = mongoose.model('ItineraryComment', ItineraryCommentSchema);