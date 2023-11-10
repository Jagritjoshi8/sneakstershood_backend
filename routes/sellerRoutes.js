const express = require("express");
const userController = require("../Controllers/userController");
const authController = require("../Controllers/authController");
const authSellerController = require("../Controllers/authSellerController");
const detailValidation = require("../Middleware/detailValidation");
const upload = require("../Middleware/multerSetup");
const router = express.Router();

router.post(
  "/signup-seller",
  upload.single("logoimg"),
  authSellerController.sellersignup
  //   detailValidation,
  //   authController.signup
);
// router.post("/login", authController.login);
// router.route("/").get(authController.protect, userController.getAllUsers);

module.exports = router;
