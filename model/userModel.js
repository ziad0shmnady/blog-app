const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/connection");
const user = sequelize.define(
  "user",
  {
    user_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    updatedAt: false,
  }
);

module.exports = user;
