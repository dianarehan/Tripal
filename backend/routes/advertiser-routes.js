const express = require('express');
const router = express.Router();
const {createAdvertiser} = require ('../controllers/AdvertiserController');

router.post("/advertiser", createAdvertiser);

module.exports = router;
