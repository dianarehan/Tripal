const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
    title:{type: String, required: true},
    description: {type: String, required: true},
    tourGuide: {type: mongoose.Schema.Types.ObjectId, ref: 'TourGuide', required: true},
    activities:[{type: mongoose.Schema.Types.ObjectId, ref: 'Activity'
        , required: true}],

    locations:[{type:String, required:false}],//kol activity already 3ando location yetmely men activites

    //timeline btetrateb when, kol activity 3ando time attribute
    timeline: [{
        activityName: { type: String, required: true },
        time : {type: String, required: true}
    }],

    //duration for each activity activity 3ando time already

    language: {type: String, required: true},
    price:{type: Number}, //activity 3ando price also 3ando special disscpunts

    availableDates:[{type: Date, required: true}],
    availableTime: [{type: String, required: true}],

    accessibility: [{type: String, required: true}],
    pickupLocation: {type: String, required: true},
    dropoffLocation: {type: String, required: true},


    tags:[{type:String}] // lesa idk how to use this do i need tags from activity?

}, {timestamps: true});

  itinerarySchema.pre('remove', async function (next) {
    const bookings = await Booking.find({ itinerary: this._id });
    if (bookings.length > 0) {
        next(new Error('Cannot delete itinerary with existing bookings.'));
    } else {
        next();
    }
});
const Itinerary = mongoose.model('Itinerary', itinerarySchema);
module.exports = Itinerary;