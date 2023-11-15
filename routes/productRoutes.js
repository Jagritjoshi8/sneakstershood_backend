const express = require("express");
const productController = require("../Controllers/productController");
const authController = require("../Controllers/authController");
const blogDetailValidation = require("../Middleware/blogDetailValidation");
const IDvalidation = require("../Middleware/IDvalidation");

const router = express.Router();

// // ***********************GET MOST RECENT BLOGPOST***********************

// router.get(
//   "/getMostRecentBlog",
//   authController.protect,
//   blogController.getMostRecentBlogPost
// );

// // *************************GET MOST LIKED POSTS**************************

// router.get(
//   "/mostLiked",
//   authController.protect,
//   blogController.getMostLikedBlog
// );

// // *****************************GET ALL BLOGS*****************************
// router.get("/getAllBlogs", blogController.getAllBlogPosts);

// **********************************CREATE A NEW BLOG********************
router.post(
  "/create-product",
  productController.createproduct,
//   authController.protect,
//   blogDetailValidation,
);

// //******************************** CRUD *****************************************
// router
//   .route("/:id?")
//   .get(IDvalidation, blogController.getBlogPostById)
//   .patch(
//     authController.protect,
//     IDvalidation,
//     blogController.updateBlogPostById
//   )
//   .delete(
//     authController.protect,
//     IDvalidation,
//     blogController.deleteBlogPostById
//   );

// //****************************GET POST BY TOPIC*****************************

// router.get("/topics/:id?", IDvalidation, blogController.getPostsByTopic);

module.exports = router;
