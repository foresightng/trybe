const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const product = require("../models/Product");
const multer = require("../middleware/upload");

const createProduct = async (req, res, next) => {
  const userId = req.user.userid
  const newProduct = new product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    quantity: req.body.quantity,
    category: req.body.category,
    createdBy: userId,
    image: req.file ? req.file.filename : "",
    images: req.body.images,
    brand: req.body.brand,
    inStock: req.body.inStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
    hasDiscount: req.body.hasDiscount,
    dateCreated: Date.now(),
  });
  newProduct
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Product created successfully",
        product: result,
      });
      
    })
    .catch((err) => {
      console.error(err.message);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ status: "error", msg: err.message });
    });
};

const getAllProducts = async (req, res, next) => {
  await product
    .find({})
    .populate({
      path: 'createdBy', // Referencing the 'createdBy' field from the Product schema
      select: 'firstName lastName email country state city postalCode gender businessName phoneNumber accountNumber bank role' // Specify the fields you want to include from the User schema
      
    })
    .then((products) => {
      res.status(200).json({ products, count: products.length });
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).json({
        error: {
          message: "Failed to fetch products",
        },
      });
    });
};


const getNewlyArrivedBrands = async (req, res, next) => {
  try {
    const products = await product.find({}).sort({ dateCreated: -1 }).limit(10);

    const brandMap = new Map();

    products.forEach((product) => {
      const brand = product.brand;
      if (!brandMap.has(brand)) {
        brandMap.set(brand, product.toObject());
      }
    });

    const response = {
      status: "success",
      msg: "Newly arrived products fetched successfully",
      data: Array.from(brandMap.values()),
    };

    res.status(StatusCodes.OK).json(response);
  } catch (error) {
    console.error(error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: "error",
      msg: "Failed to fetch newly arrived products",
      error: error.message,
    });
  }
};

const getProductById = async (req, res, next) => {
  const productId = req.params.id;
  product
    .findById(productId)
    .populate({
      path: 'createdBy', // Referencing the 'createdBy' field from the Product schema
      select: 'firstName lastName email country state city postalCode gender businessName phoneNumber accountNumber bank role' // Specify the fields you want to include from the User schema
      
    })
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }
      res.status(200).json(product);
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).json({
        error: {
          message: "Failed to fetch product",
        },
      });
    });
};

const updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const updates = req.body;
    const options = { new: true };

    const result = await product.findByIdAndUpdate(productId, updates, options);
    if (!result) {
      return res.status(404).json({ message: "Product not found" });
    }
    res
      .status(200)
      .json({ message: "Product updated successfully", product: result });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: { message: "Failed to update product" } });
  }
};

const uploadProductImages = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    product.images = req.body.images;

    const savedProduct = await product.save();
    res.json({
      message: "Product images uploaded successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      error: {
        message: "Failed to upload product images",
      },
    });
  }
};

const deleteProduct = async (req, res, next) => {
  const productId = req.params.id;
  try {
    const result = await product.findByIdAndDelete(productId);
    console.log(result);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: { message: "Failed to delete product" } });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getNewlyArrivedBrands,
  getProductById,
  updateProduct,
  uploadProductImages,
  deleteProduct,
};
