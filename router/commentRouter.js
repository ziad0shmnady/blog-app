const express = require("express");
const router = express.Router();
const commentController = require("../controller/commentController");
const userAuth = require("../auth/userAuth");
// get all comment
router.get("/getAllComment", commentController.getAllComment);
// get comment by id
router.get("/getCommentById/:id", commentController.getCommentById);
// create comment
router.post(
  "/createComment",
  userAuth.isLogin,
  commentController.createComment
);
// update comment
router.put(
  "/updateComment/:id",
  userAuth.isLogin,
  commentController.updateComment
);
// delete comment
router.delete(
  "/deleteComment/:id",
  userAuth.isLogin,
  commentController.deleteComment
);

module.exports = router;
