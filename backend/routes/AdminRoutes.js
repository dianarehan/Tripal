const express = require("express");
const router = express.Router();
const { addTourismGovernor, addAdmin } = require('../controllers/AdminController');

router.post("/admin/addGovernor", addTourismGovernor);
router.post("/admin/addAdmin", addAdmin);


module.exports = router;
