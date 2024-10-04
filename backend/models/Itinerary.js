const mongoose = require('mongoose');
const itinerarySchema = new mongoose.Schema({

    title:{type: String, required: true},

    description: {type: String, required: true},

    tourGuide: {type: mongoose.Schema.Types.ObjectId, ref: 'TourGuide'
        , required: true},

    activities:[{type: mongoose.Schema.Types.ObjectId, ref: 'Activity'
        , required: true}],

    locations:[{type:String}],//kol activity already 3ando location yetmely men activites

    //timeline btetrateb when, kol activity 3ando time attribute
    timeline: [
        {
            activityName: { type: String}, 
            time: { type: String},
        },
    ],

    //duration for each activity activity 3ando time already
    serviceFee: {type: Number, default: 0}, 
    language: {type: String, required: true},
    price:{type: Number}, //activity 3ando price also 3ando special disscpunts

    availableDates:[{type: Date, required: true}],
    availableTime: [{type: String, required: true}],

    accessibility: [{type: String, required: true}],
    pickupLocation: {type: String, required: true},
    dropoffLocation: {type: String, required: true},


    tags:[{type:String}], // lesa idk how to use this do i need tags from activity?
    tourists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tourist' }] // Add this line

}, {timestamps: true});

//this hook middleware is used to prevent the deletion of an itinerary that has bookings
itinerarySchema.pre('findOneAndDelete', async function (next) {
    const itinerary = await this.model.findOne(this.getQuery());
    if (itinerary.tourists.length > 0) {
        next(new Error('Cannot delete itinerary with associated tourists.'));
    } else {
        next();
    }
});

const Itinerary = mongoose.model('Itinerary', itinerarySchema);
module.exports = Itinerary;