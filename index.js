const express = require("express");
const dotenv = require("dotenv");
const app = express();
const sequelize = require("./db/connection");
const relationships = require("./db/relation");
const ApiError = require("./error/apiError");
const StatusCode = require("./utility/statusCode");
const error = require("./utility/error");
// Importing models
const User = require("./model/userModel");
const Post = require("./model/postModel");
const Comment = require("./model/commentModel");
const Category = require("./model/categoryModel");
const PostCategory = require("./model/post_categoryModel");

// Importing routes
const userRoutes = require("./router/userRouter");
const postRoutes = require("./router/postRouter");
const commentRoutes = require("./router/commentRouter");
const categoryRoutes = require("./router/categoryRouter");
const postCategoryRoutes = require("./router/postCategoryRouter");
app.use(express.json());
dotenv.config();

// routes
app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.use("/comment", commentRoutes);
app.use("/category", categoryRoutes);
app.use("/postCategory", postCategoryRoutes);
// error handling
app.use((err, req, res, next) => {
  errorStatus = err.status || 500;
  errorMassage = err.message || "something is wrong";
  return res.status(500).json({
    success: false,
    status: errorStatus,
    message: errorMassage,
  });
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Port is connected ${process.env.PORT}`);
});
