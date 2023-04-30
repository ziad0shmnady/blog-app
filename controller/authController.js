const User = require("../model/userModel");
const errorHandler = require("../utils/error");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register
exports.register = async (req, res, next) => {
  try {
    const { username, email, password, isWriter } = req.body;
    const user = await User.create({
      username,
      email,
      password,
      isWriter,
    });
    res.status(200).json({
      success: true,
      message: "Register success",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// login
exports.login = async (req, res, next) => {};
