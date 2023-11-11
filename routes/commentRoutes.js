const express = require("express");
const blogController = require("../Controllers/blogController");
const authController = require("../Controllers/authController");
const commentController = require("../Controllers/commentController");
const IDvalidation = require("../Middleware/IDvalidation");

const router = express.Router();

router
  .route("/getAllComments")
  .get(authController.protect, commentController.getAllComments);
router.route("/getAllComments/:id").get(commentController.getCommentsOfBlog);

router
  .route("/:id?")
  .post(commentController.createComment)
  .get(authController.protect, IDvalidation, commentController.getCommentById)
  .delete(
    authController.protect,
    IDvalidation,
    commentController.deleteComment
  );

module.exports = router;
