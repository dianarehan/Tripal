const express = require("express");
const router = express.Router();
const { createRequest, getRequests, deleteRequest, getRequestById, acceptRequest } = require("../controllers/RequestController");

router.post("/request", createRequest);
router.get("/request", getRequests);
router.get("/request/:id", getRequestById);
router.delete("/request/:id", deleteRequest);
router.put("/request/:id", acceptRequest);

module.exports = router;