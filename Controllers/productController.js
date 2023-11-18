const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const Product = require("../models/productModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const bcrypt = require("bcryptjs");

const createproduct = catchAsync(
  async (req, res, next) => {
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
      description,
      sellerId,
      sellerName,
    } = req.body;
    // console.log("file----", req.file);
    console.log(req.body);
    const discounted_price = Math.floor(
      original_price - original_price * (discountper / 100)
    );
    const productimg = req.file.path;
    console.log("product img", productimg);
    const newProduct = await Product.create({
      name,
      original_price,
      discounted_price,
      category_name,
      is_stock,
      rating: 2.5, //default 2.5
      reviews: 0,
      trending: false,
      size,
      brand,
      color,
      qualityType,
      description,
      sellerId,
      sellerName,
      img: productimg,
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

const getAllProducts = catchAsync(async (req, res, next) => {
  // await BlogPostModel.restore();
  const allProducts = await Product.find();

  res.status(200).json({
    allProducts,
  });
});

const getSellerProducts = catchAsync(async (req, res, next) => {
  const sellerid = req.params.id;
  // console.log(userid);
  //   const uname = "sneaker1";
  const sellerProducts = await Product.find({ sellerId: sellerid });
  // .populate("order")
  // .populate("coustomerDetails")
  // .populate("deliveryAddress")
  // .populate("deliveryDate")
  // .populate("orderItems");
  if (!sellerProducts || sellerProducts.length === 0)
    return next(new AppError("You have no current orders", 404));

  res.status(200).json({
    success: true,
    totalSellerProducts: sellerProducts.length,
    sellerProducts,
  });
});

module.exports = {
  createproduct,
  getAllProducts,
  getSellerProducts,
};
