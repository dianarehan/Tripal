const express = require('express');
const router = express.Router();
const {createSeller} = require ('../controllers/SellerController');

// defining seller routes
router.post("/seller", createSeller);

module.exports = router;
