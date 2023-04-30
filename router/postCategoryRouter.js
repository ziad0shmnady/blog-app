const express = require("express");
const router = express.Router();
const postCategoryController = require("../controller/postCategoryController");

// get all post_category
router.get("/getAllPostCategory", postCategoryController.getAllPostCategory);
// get post_category by id
router.get(
  "/getPostCategoryById/:id",
  postCategoryController.getPostCategoryById
);
// create post_category
router.post("/createPostCategory", postCategoryController.createPostCategory);
// update post_category
router.put(
  "/updatePostCategory/:id",
  postCategoryController.updatePostCategory
);
// delete post_category
router.delete(
  "/deletePostCategory/:id",
  postCategoryController.deletePostCategory
);

module.exports = router;
