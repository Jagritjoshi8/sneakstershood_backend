const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const Product = require("../models/productModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const bcrypt = require("bcryptjs");



const createproduct = catchAsync(async (req, res, next) => {
    const {
      name,
      original_price,
      discountper,
      category_name,
      is_stock,
      size,
      brand,
      color,
      qualityType,
      sellerId,
      sellerName
    } = req.body;
    // console.log("file----", req.file);
  
    const productimg = req.file.path;
  
    const newProduct = await Product.create({
        name,
        original_price,
        discounted_price: original_price*(discountper/100),
        category_name,
        is_stock,
        rating,//default 2.5
        reviews,
        trending,
        size,
        brand,
        color,
        qualityType,
        sellerId,
        sellerName,
        productimg,
    });
    res.status(201).json({
        _id: newProduct._id,
        name,
        discounted_price,
        sellerId,
      });
    
  },
  (error) => {
    res.status(500).json({ error: "Failed to create new product" });
  }
  );
  
  module.exports = {
    createproduct
  };
  