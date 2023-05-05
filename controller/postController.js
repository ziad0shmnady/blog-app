const Post = require("../model/postModel");
const StatusCode = require("../utility/statusCode");
const error = require("../utility/error");
const { Op } = require("sequelize");
const logger = require("../utility/logger");
const jwt = require("jsonwebtoken");

exports.getAllPost = async (req, res, next) => {
  try {
    const result = await Post.findAll();
    logger.info("get all post");
    res.status(StatusCode.SUCCESS).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(error.createError(StatusCode.NOT_FOUND, err.message));
  }
};

exports.getPostById = async (req, res, next) => {
  try {
    const result = await Post.findByPk(req.params.id);
    if (!result) {
      next(error.createError(StatusCode.NOT_FOUND, "Post not found"));
    }
    res.status(StatusCode.SUCCESS).json({
      success: true,
      data: result,
    });
    logger.info(`get post ${result.title} by id`);
  } catch (err) {
    next(error.createError(StatusCode.NOT_FOUND, err.message));
  }
};

exports.createPost = async (req, res, next) => {
  const token = req.cookies.access_token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.id;

  const { title, content } = req.body;
  const post = await Post.findOne({
    where: { [Op.or]: [{ title: title }] },
  });
  if (post) {
    next(error.createError(StatusCode.BAD_REQUEST, "Title already exists"));
  }
  try {
    const result = await Post.create({
      title,
      content,
      userId,
    });
    res.status(StatusCode.CREATED).json({
      success: true,
      data: result,
    });
    logger.info(`create post ${result.title}`);
  } catch (err) {
    next(error.createError(StatusCode.BAD_REQUEST, err.message));
  }
};

exports.updatePost = async (req, res, next) => {
  const token = req.cookies.access_token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.id;
  const userName = decoded.userName;
  try {
    const result = await Post.update(req.body, {
      where: { [Op.and]: [{ post_Id: req.params.id }, { userId: userId }] },
      returning: true,
      plain: true,
    });

    if (result[0] === 0) {
      next(error.createError(StatusCode.NOT_FOUND, "Post not found"));
    }
    res.status(StatusCode.SUCCESS).json({
      success: true,
      data: result,
    });
    logger.info(`update post ${req.params.id}`);
  } catch (err) {
    next(
      error.createError(
        StatusCode.UNAUTHORIZED,
        `${userName} You are not authorized to update this post`
      )
    );
  }
};

exports.deletePost = async (req, res, next) => {
  const token = req.cookies.access_token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.id;
  const userName = decoded.userName;
  try {
    const post = await Post.findOne({
      where: { [Op.and]: [{ post_Id: req.params.id }, { userId: userId }] },
    });
    if (!post) {
      next(
        error.createError(
          StatusCode.UNAUTHORIZED,
          `${userName} You are not authorized to update this post`
        )
      );
    }
    await post.destroy();
    res.status(StatusCode.SUCCESS).json({
      success: true,
      data: post,
    });
    logger.info(`delete post ${req.params.id}`);
  } catch (err) {
    next(error.createError(StatusCode.BAD_REQUEST, err.message));
  }
};
