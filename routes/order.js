const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authenticateUser");
const {
  createOrder,
  getOrders,
  getOrderById,
  getOrdersByStatus,
  updateOrder,
  cancelOrder,
} = require("../controllers/order");

// order routes
router.post("/create", authenticateUser, createOrder);
router.get("/", authenticateUser, getOrders);
router.get("/:orderId", authenticateUser, getOrderById);
router.get("/status/:orderStatus", authenticateUser, getOrdersByStatus);
router.put("/:orderId", authenticateUser, updateOrder);
router.put("/cancel/:orderId", authenticateUser, cancelOrder);

module.exports = router;
