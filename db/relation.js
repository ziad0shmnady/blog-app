const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./connection");
const User = require("../model/userModel");
const Post = require("../model/postModel");
const Comment = require("../model/commentModel");
const Category = require("../model/categoryModel");
const PostCategory = require("../model/post_categoryModel");

// Define the relationships between the models

// relationship between user and post
User.hasMany(Post, { foreignKey: "userId" });

// relationship between user and comment
User.hasMany(Comment, { foreignKey: "userId" });

// relationship between post and comment
Post.hasMany(Comment, { foreignKey: "postId" });

// relationship between post and category
Post.belongsToMany(Category, { through: PostCategory, foreignKey: "postId" });
Category.belongsToMany(Post, {
  through: PostCategory,
  foreignKey: "categoryId",
});
