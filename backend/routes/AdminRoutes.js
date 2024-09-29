const express = require("express");
const router = express.Router();
const { deleteUser, addAdmin, getAllUsers } = require('../controllers/AdminController');

router.post("/admin/addAdmin", addAdmin);
router.delete("/admin/deleteUser/:id",deleteUser);  
router.get("/admin/getUsers",getAllUsers);

module.exports = router;
