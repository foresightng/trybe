const mongoose = require("mongoose");
const Product = require('./Product')


const orderSchema = mongoose.Schema({
  orderItems: [
    {
      _id: false,
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },

      quantity: {
        type: Number,
        default: 1,
      },

    },
  ],
  shippingAddress1: {
    type: String,
  },
  shippingAddress2: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  
  paymentRefId: {
    type: String,
  },
  paymentMethod: {
    type: String,
  },
  totalPrice: {
    type: String,
    required: true,
  },
  orderNote: {
    type: String,
  },

  orderStatus: {
    type: String,
    enum: ["pending", "completed", "cancelled"],
    default: "pending",
  },

  dateOrdered: {
    type: Date,
    dafault: Date.now,
  },
});

orderSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

orderSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Order", orderSchema);
