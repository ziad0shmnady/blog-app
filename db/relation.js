const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./connection");
const User = require("../model/userModel");
const Post = require("../model/postModel");
// Define the relationships between the models
User.hasMany(Post, { foreignKey: "userId" });
