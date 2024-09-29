const express = require('express');
const router = express.Router();
const { createTourist } = require('../controllers/TouristController.js');

router.post("/createTourist", createTourist);




module.exports = router;