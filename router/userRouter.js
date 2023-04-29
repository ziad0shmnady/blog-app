const express = require("express");
const router = express.Router();
const UserController = require("../controller/userController");

// get all user
router.get("/getAllUser", UserController.getAllUser);
// get user by id
router.get("/getUserById/:id", UserController.getUserById);
// create user
router.post("/createUser", UserController.createUser);
// update user
router.put("/updateUser/:id", UserController.updateUser);
// delete user
router.delete("/deleteUser/:id", UserController.deleteUser);
module.exports = router;
