const { Sequelize } = require("sequelize");
const sequelize = require("../db/connection");
const post_category = sequelize.define(
  "postCategory",
  {
    post_category_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
  },
  {
    timestamps: true,
    updatedAt: true,
  }
);

module.exports = post_category;
