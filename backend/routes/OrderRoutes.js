const express = require("express");
const router = express.Router();
const validateIDs = require("../middleware/IDMiddleware");
const { verifyToken, authorizeRoles } = require("../middleware/AuthMiddleware");
const {
  createOrder,
  cancelOrder,
  getOrders
} = require("../controllers/OrderController");

router.post(
  "/tourist/order",
  verifyToken,
  authorizeRoles("Tourist"),
  createOrder
);

router.delete(
    "/tourist/order/:id",
    validateIDs(["id"]),
    verifyToken,
    authorizeRoles("Tourist"),
    cancelOrder
  );

  router.get(
    "/tourist/order",
    verifyToken, 
    authorizeRoles("Tourist"), 
    getOrders 
  );

module.exports = router;