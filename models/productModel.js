const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please tell us sneaker name!"],
      unique: true,
    },

    original_price: {
      type: Number,
      require: [true, "pls provide your original price"],
    },
    discounted_price: {
      type: Number,
      required: [true, "please tell us discounted price"],
    },
    category_name: {
      type: String,
      required: [true, "please tell us your category of product"],
    },
    is_stock: {
      type: Boolean,
      required: [true, "please tell us whether product is in stock or not"],
    },
    size: {
      type: Number,
      required: [true, "please tell us Sneaker Size"],
    },
    rating: {
      type: Number,
      default: 2.5,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    trending: {
      type: Boolean,
      default: false,
    },
    brand: {
      type: String,
    },
    color: {
      type: String,
    },
    qualityType: {
      type: String,
    },
    description: {
      type: String,
    },
    sellerId: {
      type: String,
      require: [true, "pls provide quality type of sneaker"],
    },
    sellerName: {
      type: String,
      require: [true, "pls provide quality type of sneaker"],
    },

    img: {
      type: String,
    },
  },
  { timestamps: true }
);

const Product = new mongoose.model("Product", productSchema);
module.exports = Product;
