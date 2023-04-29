const User = require("../model/userModel");
const StatusCode = require("../utility/statusCode");
const error = require("../utility/error");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const logger = require("../utility/logger");
exports.getAllUser = async (req, res, next) => {
  try {
    const result = await User.findAll();
    logger.info("get all user");
    res.status(StatusCode.SUCCESS).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(error.createError(StatusCode.NOT_FOUND, err.message));
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const result = await User.findByPk(req.params.id);
    if (!result) {
      next(error.createError(StatusCode.NOT_FOUND, "User not found"));
    }
    res.status(StatusCode.SUCCESS).json({
      success: true,
      data: result,
    });
    logger.info(`get user ${result.username} by id`);
  } catch (err) {
    next(error.createError(StatusCode.NOT_FOUND, err.message));
  }
};

exports.createUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({
    where: { [Op.or]: [{ username: username }, { email: email }] },
  });
  if (user) {
    next(
      error.createError(
        StatusCode.BAD_REQUEST,
        "Username or email already exists"
      )
    );
  }
  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      next(error.createError(StatusCode.BAD_REQUEST, err.message));
    }
    try {
      const result = await User.create({
        username,
        email,
        password: hash,
      });
      res.status(StatusCode.CREATED).json({
        success: true,
        data: result,
      });
      logger.info(`create user ${result.username}`);
    } catch (err) {
      next(error.createError(StatusCode.BAD_REQUEST, err.message));
    }
  });
};

exports.updateUser = async (req, res, next) => {
  const { user_Id, username, email, password } = req.body;
  const user = await User.findByPk(req.params.id);
  if (!user) {
    next(error.createError(StatusCode.NOT_FOUND, "User not found"));
  }
  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      next(error.createError(StatusCode.BAD_REQUEST, err.message));
    }
    try {
      const result = await User.update(
        {
          user_Id,
          username,
          email,
          password: hash,
        },
        {
          where: { user_Id: req.params.id },
          returning: true,
          plain: true,
        }
      );
      res.status(StatusCode.CREATED).json({
        success: true,
        data: result[1],
      });
      logger.info(`update user ${result[1].username}`);
    } catch (err) {
      next(error.createError(StatusCode.BAD_REQUEST, err.message));
    }
  });
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      next(error.createError(StatusCode.NOT_FOUND, "User not found"));
    }
    await user.destroy();
    res.status(StatusCode.SUCCESS).json({
      success: true,
      data: user,
    });
    logger.info(`delete user ${user.username}`);
  } catch (err) {
    next(error.createError(StatusCode.BAD_REQUEST, err.message));
  }
};
