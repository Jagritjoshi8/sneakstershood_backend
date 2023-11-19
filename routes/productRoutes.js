const express = require("express");
const productController = require("../Controllers/productController");
const authController = require("../Controllers/authController");
const blogDetailValidation = require("../Middleware/blogDetailValidation");
const IDvalidation = require("../Middleware/IDvalidation");
const upload = require("../Middleware/multerSetup");

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
router.get("/getAllProducts", productController.getAllProducts);

// **********************************CREATE A NEW BLOG********************
router.post(
  "/create-product",
  upload.single("productimg"),
  productController.createproduct
  //   authController.protect,
  //   blogDetailValidation,
);

// //****************************GET POST BY TOPIC*****************************

router.get(
  "/getSellerProducts/:id?",
  IDvalidation,
  productController.getSellerProducts
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

module.exports = router;
