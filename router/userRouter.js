const express = require("express");
const router = express.Router();
const UserController = require("../controller/userController");
const { userSchema, loginSchema } = require("../validation/schemaValidate");
const { validateBody } = require("../validation/validateBody");
// get all user
router.get("/getAllUser", UserController.getAllUser);

// login
router.post("/login", validateBody(loginSchema), UserController.login);
// get user by id
router.get("/getUserById/:id", UserController.getUserById);
// create user
router.post("/createUser", validateBody(userSchema), UserController.createUser);
// update user
router.put("/updateUser/:id", UserController.updateUser);
// delete user
router.delete("/deleteUser/:id", UserController.deleteUser);
module.exports = router;
