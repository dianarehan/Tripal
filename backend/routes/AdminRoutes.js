const express = require("express");
const router = express.Router();
const validateIDs = require("../middleware/IDMiddleware");
const { deleteUser, addAdmin, getAllUsers } = require('../controllers/AdminController');
const { changePassword } = require('../controllers/PasswordController.js');
const Admin = require("../models/users/Admin.js")
const {adminFlagItinerary,getAllItinerariesForAdmin} = require('../controllers/ItineraryController.js');
const {getAllActivitiesForAdmin,adminFlagActivity} = require('../controllers/ActivityController.js');

router.post("/admin/addAdmin", addAdmin);
router.delete("/admin/user/:id", deleteUser);
router.get("/admin/users", getAllUsers);
router.put("/admin-change-pass/:id", validateIDs(["id"]), changePassword(Admin));
router.put("/admin/flag-itinerary/:itineraryId", adminFlagItinerary);
router.put("/admin/flag-activity/:activityId", adminFlagActivity);
router.get("/admin/itineraries", getAllItinerariesForAdmin);
router.get("/admin/activities", getAllActivitiesForAdmin);
module.exports = router;