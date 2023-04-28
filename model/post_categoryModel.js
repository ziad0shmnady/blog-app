const { Sequelize } = require("sequelize");
const sequelize = require("../db/connection");
const post_category = sequelize.define(
  "post_category",
  {
    post_category_id: {
      type: Sequelize.serielize,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    updatedAt: true,
  }
);

module.exports = post_category;
