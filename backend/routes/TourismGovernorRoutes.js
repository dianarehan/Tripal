const express = require("express");
const router = express.Router();
const { addTourismGovernor, getTourismGovernors } = require('../controllers/TourismGovernorController');
const {createPrefTags } = require('../controllers/PreferenceTagController');


router.post("/admin/addGovernor", addTourismGovernor);
router.get("/admin/getGovernor",getTourismGovernors);
router.post("/governor/pref-tags",createPrefTags);


module.exports = router;