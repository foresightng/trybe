const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authenticateUser");
const {
  createInventory,
  getInventory,
  getInventoryByProduct,
} = require("../controllers/inventory");

router.post("/:productId", authenticateUser, createInventory);
router.get("/", authenticateUser, getInventory);
router.get("/:productId", authenticateUser, getInventoryByProduct);

module.exports = router;
