const User = require("../model/userModel");
const StatusCode = require("../utility/statusCode");
const error = require("../utility/error");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const logger = require("../utility/logger");
const jwt = require("jsonwebtoken");

exports.isLogin = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      next(error.createError(StatusCode.UNAUTHORIZED, "You are not logged in"));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user) {
      next(error.createError(StatusCode.UNAUTHORIZED, "User not found"));
    }
    req.user = user;
    next();
  } catch (err) {
    next(error.createError(StatusCode.UNAUTHORIZED, "You are not logged in"));
  }
};

exports.isWriter = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      next(error.createError(StatusCode.UNAUTHORIZED, "You are not logged in"));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user) {
      next(error.createError(StatusCode.UNAUTHORIZED, "User not found"));
    }
    if (!user.isWriter) {
      next(error.createError(StatusCode.UNAUTHORIZED, "You are not writer"));
    }
    req.user = user;
    next();
  } catch (err) {
    next(error.createError(StatusCode.UNAUTHORIZED, "You are not logged in"));
  }
};
