const express = require("express");
const router = express.Router();
const postController = require("../controller/postController");
const userAuth = require("../auth/userAuth");

// get all post
router.get("/getAllPost", postController.getAllPost);
// get post by id
router.get("/getPostById/:id", userAuth.isLogin, postController.getPostById);
// create post
router.post("/createPost", userAuth.isWriter, postController.createPost);
// update post
router.put("/updatePost/:id", userAuth.isWriter, postController.updatePost);
// delete post
router.delete("/deletePost/:id", postController.deletePost);
module.exports = router;
