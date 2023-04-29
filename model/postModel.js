const { Sequelize } = require("sequelize");
const sequelize = require("../db/connection");
const User = require("./userModel");
const post = sequelize.define(
  "post",
  {
    post_Id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    content: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: true,
    updatedAt: true,
  }
);

module.exports = post;
