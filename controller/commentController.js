const Comment = require("../model/commentModel");
const StatusCode = require("../utility/statusCode");
const error = require("../utility/error");
const { Op } = require("sequelize");
const logger = require("../utility/logger");
const jwt = require("jsonwebtoken");
exports.getAllComment = async (req, res, next) => {
  try {
    const result = await Comment.findAll();
    logger.info("get all comment");
    res.status(StatusCode.SUCCESS).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(error.createError(StatusCode.NOT_FOUND, err.message));
  }
};

exports.getCommentById = async (req, res, next) => {
  try {
    const result = await Comment.findByPk(req.params.id);
    if (!result) {
      next(error.createError(StatusCode.NOT_FOUND, "Comment not found"));
    }
    res.status(StatusCode.SUCCESS).json({
      success: true,
      data: result,
    });
    logger.info(`get comment ${result.title} by id`);
  } catch (err) {
    next(error.createError(StatusCode.NOT_FOUND, err.message));
  }
};

exports.createComment = async (req, res, next) => {
  const token = req.cookies.access_token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.id;
  const { content, postId } = req.body;
  const comment = await Comment.findOne({
    where: { [Op.or]: [{ content: content }] },
  });
  if (comment) {
    next(error.createError(StatusCode.BAD_REQUEST, "Content already exists"));
  }
  try {
    const result = await Comment.create({
      content,
      userId,
      postId,
    });
    res.status(StatusCode.CREATED).json({
      success: true,
      data: result,
    });
    logger.info(`create comment ${result.content} by ${result.userId}`);
  } catch (err) {
    next(error.createError(StatusCode.BAD_REQUEST, err.message));
  }
};

exports.updateComment = async (req, res, next) => {
  const token = req.cookies.access_token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.id;
  const userName = decoded.userName;
  const { content, postId } = req.body;
  const comment = await Comment.findOne({
    where: { [Op.and]: [{ comment_id: req.params.id }, { userId: userId }] },
  });
  if (!comment) {
    next(
      error.createError(
        StatusCode.UNAUTHORIZED,
        `${userName} You are not authorized to update this post`
      )
    );
  }
  try {
    const result = await Comment.update(req.body, {
      where: {
        comment_id: req.params.id,
      },
      returning: true,
      plain: true,
    });
    res.status(StatusCode.SUCCESS).json({
      success: true,
      data: result[1],
    });
    logger.info(`update comment ${result.content} by ${result.userId}`);
  } catch (err) {
    next(error.createError(StatusCode.BAD_REQUEST, err.message));
  }
};

exports.deleteComment = async (req, res, next) => {
  const token = req.cookies.access_token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.id;
  const userName = decoded.userName;
  try {
    const comment = await Comment.findOne({
      where: { [Op.and]: [{ comment_id: req.params.id }, { userId: userId }] },
    });
    if (!comment) {
      next(
        error.createError(
          StatusCode.UNAUTHORIZED,
          `${userName} You are not authorized to update this post`
        )
      );
    }
    await comment.destroy();
    res.status(StatusCode.SUCCESS).json({
      success: true,
      data: comment,
    });
    logger.info(`delete comment ${result.content} by ${result.userId}`);
  } catch (err) {
    next(error.createError(StatusCode.BAD_REQUEST, err.message));
  }
};
