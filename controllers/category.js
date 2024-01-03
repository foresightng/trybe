const Category = require("../models/Category");
const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");

const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Check for existing category
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(StatusCodes.BAD_REQUEST).json({ status: "error", msg: "Category already exists" });
    }

    const newCategory = new Category({ name, description });
    const savedCategory = await newCategory.save();

    res.status(StatusCodes.CREATED).json({ status: "success", category: savedCategory });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: "error", msg: "Failed to create category: " + error.message });
  }
};


const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(StatusCodes.OK).json({ status: "success", categories });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: "error", msg: error.message });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await Category.findById(categoryId);

    if (!category) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ status: "error", msg: "Category not found" });
    }

    res.status(StatusCodes.OK).json({ status: "success", category });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: "error", msg: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const updates = req.body;

    // Check if category exists
    const categoryExists = await Category.findById(categoryId);
    if (!categoryExists) {
      return res.status(StatusCodes.NOT_FOUND).json({ status: "error", msg: "Category not found" });
    }

    const updatedCategory = await Category.findByIdAndUpdate(categoryId, updates, { new: true });

    res.status(StatusCodes.OK).json({ status: "success", category: updatedCategory });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: "error", msg: "Failed to update category: " + error.message });
  }
};


const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    // Check for dependencies (e.g., products associated with this category)
    const dependentProducts = await Product.find({ category: categoryId });
    if (dependentProducts.length > 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: "error",
        msg: "Cannot delete category as there are products associated with it",
      });
    }

    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return res.status(StatusCodes.NOT_FOUND).json({ status: "error", msg: "Category not found" });
    }

    res.status(StatusCodes.OK).json({ status: "success", msg: "Category deleted successfully" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: "error", msg: "Failed to delete category: " + error.message });
  }
};


module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
