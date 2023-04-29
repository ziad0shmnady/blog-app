const { Sequelize } = require("sequelize");
const sequelize = require("../db/connection");
const comment = sequelize.define(
  "comment",
  {
    comment_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    content: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    updatedAt: true,
  }
);

module.exports = comment;
