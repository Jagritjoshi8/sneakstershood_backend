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

// // *****************************GET ALL PRODUCTS*****************************
router.get("/getAllProducts", productController.getAllProducts);

// **********************************CREATE A NEW PRODUCT********************
router.post(
  "/create-product",
  upload.single("productimg"),
  productController.createproduct
  //   authController.protect,
);

router.post(
  "/restoreProducts/:id?",
  productController.restoreProducts
  //   authController.protect,
);
// //****************************GET PRODUCTS BY SELLER ID*****************************

router.get(
  "/getSellerProducts/:id?",
  IDvalidation,
  productController.getSellerProducts
);

router.get(
  "/getDeletedSellerProducts/:id?",
  IDvalidation,
  productController.getDeletedSellerProducts
);
router
  .route("/hardDelete/:id?")
  .delete(IDvalidation, productController.hardDeleteProductById);
//******************************** CRUD *****************************************
router
  .route("/:id?")
  .delete(IDvalidation, productController.deleteProductById)
  .patch(
    IDvalidation,
    upload.single("productimg"),
    productController.updateProductById
  );
// .get(IDvalidation, blogController.getBlogPostById)
// .patch(
//   authController.protect,
//   IDvalidation,
//   blogController.updateBlogPostById
// )

module.exports = router;
