const { Sequelize } = require("sequelize");
const sequelize = require("../db/connection");
const category = sequelize.define(
  "category",
  {
    category_id: {
      type: Sequelize.serielize,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    updatedAt: true,
  }
);

module.exports = category;
