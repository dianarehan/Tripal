const express = require('express');
const router = express.Router();
const { createActivityCategory, getActivityCategories } = require('../controllers/ActivityCategoryController.js');

// create a new activity category
router.post("/addCategory", createActivityCategory);
// get all activity categorie
router.get("/getCategories", getActivityCategories);


module.exports = router;