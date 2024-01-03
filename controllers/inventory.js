const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const {BadRequestError} = require('../errors')

const mongoose = require('mongoose');

const createInventory = async (req, res) => {
  try {
    const products = req.body.products; // Expect an array of products
    let hasError = false;
    let errorProducts = [];

    for (const product of products) {
      const { quantity, productId } = product;

      // Validate productId and quantity here

      try {
        const existingInventory = await Product.findOne({ _id: productId });
        if (existingInventory) {
          existingInventory.quantity += quantity;
          await existingInventory.save();
        } else {
          throw new Error('Product does not exist, create product first');
        }
      } catch (error) {
        hasError = true;
        errorProducts.push({ productId, error: error.message });
        continue; // Continue processing other products
      }
    }

    if (hasError) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: "error",
        msg: "Failed to update some products",
        errorProducts,
      });
    } else {
      return res.status(StatusCodes.OK).json({
        status: "success",
        msg: "All inventories updated successfully",
      });
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: "error",
      msg: "Failed to process request: " + error.message,
    });
  }
};



const getInventory = async (req, res) => {
  try {
    const inventory = await Product.find({}, '_id name quantity'); // Select only specific fields

    res.status(StatusCodes.OK).json({
      status: "success",
      inventory: inventory.map(item => ({ 
        id: item._id,
        name: item.name,
        quantity: item.quantity 
      })),
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: "error",
      msg: error.message,
    });
  }
};


const getInventoryByProduct = async (req, res) => {
  try {
    const productId = req.params.productId;

    // Optionally check if the product exists here

    const inventory = await Product.findOne({ _id: productId }, '_id name quantity');

    if (!inventory) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ status: "error", msg: "Inventory not found" });
    }

    res.status(StatusCodes.OK).json({
      status: "success",
      inventory: {
        id: inventory._id,
        name: inventory.name,
        quantity: inventory.quantity
      },
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: "error",
      msg: "Failed to fetch inventory: " + error.message,
    });
  }
};






module.exports = {
  createInventory,
  getInventory,
  getInventoryByProduct,
};
