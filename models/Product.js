const mongoose = require("mongoose");
const schema = mongoose.Schema;
const Category = require('./Category')
const User = require('./User')

const ProductSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: "0",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Category',
    required:true
  },
  image: {
    type: String,
    default: "",
  },
  images: [
    {
      type: String,
    },
  ],
  brand: {
    type: String,
    default: "",
  },
  createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  rating: {
    type: String,
    default: 0,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  hasDiscount: {
    type: Boolean,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  dateModified: {
    type: Date,
  },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
