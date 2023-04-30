const express = require("express");
const router = express.Router();
const commentController = require("../controller/commentController");

// get all comment
router.get("/getAllComment", commentController.getAllComment);
// get comment by id
router.get("/getCommentById/:id", commentController.getCommentById);
// create comment
router.post("/createComment", commentController.createComment);
// update comment
router.put("/updateComment/:id", commentController.updateComment);
// delete comment
router.delete("/deleteComment/:id", commentController.deleteComment);

module.exports = router;
