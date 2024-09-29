const express = require('express');
const router = express.Router();
const {createTourGuide} = require ('../controllers/TourGuideController');

// defining tour-guide routes
router.post("/tour-guide", createTourGuide);

module.exports = router;
