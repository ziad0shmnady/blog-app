const express = require("express");
const router = express.Router();
const postController = require("../controller/postController");

// get all post
router.get("/getAllPost", postController.getAllPost);
// get post by id
router.get("/getPostById/:id", postController.getPostById);
// create post
router.post("/createPost", postController.createPost);
// update post
router.put("/updatePost/:id", postController.updatePost);
// delete post
router.delete("/deletePost/:id", postController.deletePost);
module.exports = router;
