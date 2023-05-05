const express = require("express");
const router = express.Router();
const postCategoryController = require("../controller/postCategoryController");
const userAuth = require("../auth/userAuth");
// get all post_category
router.get(
  "/getAllPostCategory",
  userAuth.isWriter,
  postCategoryController.getAllPostCategory
);
// get post_category by id
router.get(
  "/getPostCategoryById/:id",
  userAuth.isWriter,
  postCategoryController.getPostCategoryById
);
// create post_category
router.post(
  "/createPostCategory",
  userAuth.isWriter,
  postCategoryController.createPostCategory
);
// update post_category
router.put(
  "/updatePostCategory/:id",
  userAuth.isWriter,
  postCategoryController.updatePostCategory
);
// delete post_category
router.delete(
  "/deletePostCategory/:id",
  userAuth.isWriter,
  postCategoryController.deletePostCategory
);

module.exports = router;
