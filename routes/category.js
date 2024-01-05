const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authenticateUser");
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");

router.post("/create", authenticateUser, createCategory);
router.get("/", getAllCategories);
router.get("/:categoryId", authenticateUser, getCategoryById);
router.put("/:categoryId", authenticateUser, updateCategory);
router.delete("/delete/:categoryId", authenticateUser, deleteCategory);

module.exports = router;
