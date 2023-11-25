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
    //console.log(req.body);
    const discounted_price = Math.floor(
      original_price - original_price * (discountper / 100)
    );
    const productimg = req.file.path;
    // console.log("product img", productimg);
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

const restoreProducts = catchAsync(async (req, res, next) => {
  // await BlogPostModel.restore();

  const productid = req.params.id;
  await Product.restore({ _id: productid });
  const restoredProduct = await Product.findById(productid);
  await restoredProduct.save();
  res.status(200).json({
    restoredProduct,
  });
});

const getSellerProducts = catchAsync(async (req, res, next) => {
  const sellerid = req.params.id;
  // console.log(userid);
  //   const uname = "sneaker1";
  const sellerProducts = await Product.find({ sellerId: sellerid });

  if (!sellerProducts || sellerProducts.length === 0)
    return next(new AppError("You have no current orders", 404));

  res.status(200).json({
    success: true,
    totalSellerProducts: sellerProducts.length,
    sellerProducts,
  });
});

const getDeletedSellerProducts = catchAsync(async (req, res, next) => {
  const sellerid = req.params.id;
  // console.log(userid);
  //   const uname = "sneaker1";
  const sellerProducts = await Product.findDeleted({ sellerId: sellerid });

  if (!sellerProducts || sellerProducts.length === 0)
    return next(new AppError("You have no current orders", 404));

  res.status(200).json({
    success: true,
    totalSellerProducts: sellerProducts.length,
    sellerProducts,
  });
});
//**************Update Product By Id */
const updateProductById = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const { name, original_price, discountper, is_stock } = req.body;
  const discounted_price = Math.floor(
    original_price - original_price * (discountper / 100)
  );
  const img = req.file.path;
  const updated = await Product.findByIdAndUpdate(
    id,
    { name, original_price, discounted_price, is_stock, img },
    {
      new: true,
    }
  );
  console.log(updated);
  // const temp = [
  //   {
  //     ...updated.toJSON(),
  //     topic: updated.topicName,
  //   },
  // ];
  // // console.log(temp);

  // const updatedBlog = temp.map((blog) => {
  //   const { blogTopic, topic, ...rest } = blog;
  //   return {
  //     ...rest,
  //     blogTopic: topic.name,
  //   };
  // });

  if (updated) {
    res.status(201).json({
      msg: "Blog Updated Successfully",
    });
  } else {
    return next(new AppError("Something went wrong", 500));
  }
});
//***************************** DELETE A BLOGPOST ***********************************

const deleteProductById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  if (!id) return next(new AppError("ID is not present in parameter", 403));

  // await LikeDislike.delete({ blog: id });
  // await Comment.delete({ blog: id });
  const deletedProduct = await Product.findById(id);
  const deleted = await Product.delete({ _id: id });
  if (deleted) {
    res.status(201).json({
      msg: "Product Deleted Successfully",
      deletedProduct,
    });
  } else {
    return next(new AppError("Something went wrong", 500));
  }
});

const hardDeleteProductById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  if (!id) return next(new AppError("ID is not present in parameter", 403));

  // await LikeDislike.delete({ blog: id });
  // await Comment.delete({ blog: id });
  const deletedProduct = await Product.findDeleted({ _id: id });
  const deleted = await Product.findByIdAndDelete(id);
  if (deleted) {
    res.status(201).json({
      msg: "Product Deleted Successfully1",
      deletedProduct,
    });
  } else {
    return next(new AppError("Something went wrong", 500));
  }
});

module.exports = {
  createproduct,
  getAllProducts,
  getSellerProducts,
  getDeletedSellerProducts,
  updateProductById,
  deleteProductById,
  hardDeleteProductById,
  restoreProducts,
};
