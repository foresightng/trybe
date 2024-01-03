const mongoose = require('mongoose');

// Define the schema
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true,
    unique: true,
    maxlength: [50, 'Category name cannot exceed 50 characters']
  },
  description: {
    type: String,
    required: [true, 'Category description is required'],
    maxlength: [500, 'Category description cannot exceed 500 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  // Add more fields here as needed
});

// Create the model
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
