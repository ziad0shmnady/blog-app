const express = require("express");
const router = express.Router();
const categoryController = require("../controller/categoryController");
const userAuth = require("../auth/userAuth");
// get all category
router.get("/getAllCategory", categoryController.getAllCategory);
// get category by id
router.get("/getCategoryById/:id", categoryController.getCategoryById);
// create category
router.post("/createCategory", categoryController.createCategory);

// update category
router.put("/updateCategory/:id", categoryController.updateCategory);
// delete category
router.delete("/deleteCategory/:id", categoryController.deleteCategory);

module.exports = router;
