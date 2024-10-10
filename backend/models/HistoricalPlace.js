const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const historicalPlaceSchema = new Schema({
    tourismGovernor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TourismGovernor",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },

    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],

    location: {
        address: {
            type: String,
            required: true
        },
        coordinates: {
            latitude: {
                type: Number,
                required: true,

            },
            longitude: {
                type: Number,
                required: true,
            }
        }
    },
    openingHours: {
        weekdays: {
            openingTime: {
                type: String,
                required: true
            },
            closingTime: {
                type: String,
                required: true
            },

        },
        weekends: {
            openingTime: {
                type: String,
                required: true
            },
            closingTime: {
                type: String,
                required: true
            },

        },
    },
    ticketPrices: {
        foreigner: {
            type: Number,
            required: true
        },
        native: {
            type: Number,
            required: true
        },
        student: {
            type: Number,
            required: true
        }
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HistoricalTagType',
        required: false,
        default: []
    }],
    historicalPeriod: [{
        type: mongoose.Types.ObjectId,
        ref: 'HistoricalTagPeriod',
        required: false,
        default: []
    }]
}, { timestamps: true });

const HistoricalPlace = mongoose.model('HistoricalPlace', historicalPlaceSchema);
module.exports = HistoricalPlace;

