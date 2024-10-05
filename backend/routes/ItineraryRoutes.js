const express = require('express');
const router = express.Router();

const { createItinerary, getItineraries, updateItinerary, deleteItinerary, viewItineraries, addItineraryRating,getItineraryRatings } = require('../controllers/ItineraryController');

router.post('/itinerary', createItinerary); 
router.get('/itinerary', getItineraries);
router.put('/itinerary/:id', updateItinerary);
router.delete('/itinerary/:id', deleteItinerary);
router.get('/itinerary/view', viewItineraries);

router.post('/itineraryRating/:id', addItineraryRating);
router.get('/itineraryRatings/:id', getItineraryRatings);

module.exports = router;