const express = require('express');
const router = express.Router();
const { createActivityCategory, getActivityCategories } = require('../controllers/ActivityCategoryController.js');

// get all activity category
router.get("/getCategories", getActivityCategories);

// create a new activity category
router.post("/addCategory", createActivityCategory);

module.exports = router;