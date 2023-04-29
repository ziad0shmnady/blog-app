const { Sequelize } = require("sequelize");
const sequelize = require("../db/connection");
const category = sequelize.define(
  "category",
  {
    category_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
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
