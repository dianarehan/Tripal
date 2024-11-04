const Activity = require("../models/Activity");
const itineraryModel = require('../models/Itinerary');
const Tourist = require('../models/users/Tourist');

const bookResource = async (req, res) => {
    const { resourceType, resourceId } = req.params;
    const { touristId, selectedDate, selectedTime } = req.body;

    const model = resourceType === 'activity' ? Activity : itineraryModel;
  
    try {
        const resource = await model.findById(resourceId);
        if (!resource) 
            return res.status(404).json({ error: `${resourceType} not found` });
        
        if (resourceType === 'activity' && resource.isBookingOpen === false) 
            return res.status(400).json({ error: 'Booking is closed for this activity' });
        
        const tourist = await Tourist.findById(touristId);
        if (!tourist) 
            return res.status(404).json({ error: 'Tourist not found' });
        
        if (tourist.calculateAge() < 18) 
            return res.status(403).json({ error: 'You must be at least 18 years old to book' });
        
    
        if (resourceType === 'itinerary') {
            if (!selectedDate || !selectedTime) {
                return res.status(400).json({ error: 'Please provide a date and time for booking this itinerary' });
            }

            const dateIsAvailable = resource.availableDates.some(
                date => date.toISOString() === new Date(selectedDate).toISOString()
            );
            console.log(resource.availableTime); 
            const timeIsAvailable = resource.availableTime.includes(selectedTime);

            if (!dateIsAvailable || !timeIsAvailable) {
                return res.status(400).json({ error: 'Selected date or time is not available for this itinerary' });
            }
            resource.bookings.push({
                touristId,
                selectedDate,
                selectedTime,
            });
        } 
        else
            resource.tourists.push(touristId);
        await resource.save();
    
        res.status(200).json({ message: `${resourceType} booked successfully` });
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
  };

const cancelResource = async (req, res) => {
const { resourceType, resourceId } = req.params;
const { touristId } = req.body;
const model = resourceType === 'activity' ? Activity : itineraryModel;

try {
    const resource = await model.findById(resourceId);
    if (!resource) 
    return res.status(404).json({ error: `${resourceType} not founddd` });
    

    const touristIndex = resource.tourists.findIndex(id => id.toString() === touristId);
    if (touristIndex === -1) {
    return res.status(400).json({ error: `You have no booking for this ${resourceType}` });
    }

    resource.tourists.splice(touristIndex, 1);
    await resource.save();

    res.status(200).json({ message: `${resourceType} booking canceled successfully` });
} catch (error) {
    res.status(500).json({ message: 'Error canceling booking', error });
}
};
  
module.exports = {cancelResource, bookResource};