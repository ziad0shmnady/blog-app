const post_categoryModel = require("../model/post_categoryModel");
const Post = require("../model/postModel");
const Category = require("../model/categoryModel");
const StatusCode = require("../utility/statusCode");
const error = require("../utility/error");
const { Op } = require("sequelize");
const logger = require("../utility/logger");

exports.getAllPostCategory = async (req, res, next) => {
  try {
    const result = await post_categoryModel.findAll();
    logger.info("get all post_category");
    res.status(StatusCode.SUCCESS).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(error.createError(StatusCode.NOT_FOUND, err.message));
  }
};

exports.getPostCategoryById = async (req, res, next) => {
  try {
    const result = await post_categoryModel.findByPk(req.params.id);
    if (!result) {
      next(error.createError(StatusCode.NOT_FOUND, "Post_category not found"));
    }
    res.status(StatusCode.SUCCESS).json({
      success: true,
      data: result,
    });
    logger.info(`get post_category ${result.title} by id`);
  } catch (err) {
    next(error.createError(StatusCode.NOT_FOUND, err.message));
  }
};

exports.createPostCategory = async (req, res, next) => {
  const { postId, categoryId } = req.body;

  try {
    const result = await post_categoryModel.create({
      postId,
      categoryId,
    });
    res.status(StatusCode.CREATED).json({
      success: true,
      data: result,
    });
    logger.info(`create post_category ${result.title}`);
  } catch (err) {
    next(error.createError(StatusCode.BAD_REQUEST, err.message));
  }
};

exports.updatePostCategory = async (req, res, next) => {
  const { postId, categoryId } = req.body;
  try {
    const post = await Post.findByPk(postId);
    const category = await Category.findByPk(categoryId);
    console.log(post);
    console.log(category);
    if (!post || !category) {
      next(
        error.createError(StatusCode.NOT_FOUND, "Post or Category not found")
      );
    }
    const result = await post_categoryModel.update(req.body, {
      where: {
        post_category_id: req.params.id,
      },
      returning: true,
      plain: true,
    });
    res.status(StatusCode.SUCCESS).json({
      success: true,
      data: result[1],
    });
    logger.info(`update post_category ${result.title}`);
  } catch (err) {
    next(error.createError(StatusCode.BAD_REQUEST, err.message));
  }
};

exports.deletePostCategory = async (req, res, next) => {
  try {
    const postCategory = await post_categoryModel.findByPk(req.params.id);
    if (!postCategory) {
      next(error.createError(StatusCode.NOT_FOUND, "Post_category not found"));
    }
    await postCategory.destroy();
    res.status(StatusCode.SUCCESS).json({
      success: true,
      message: "Post_category deleted",
    });
    logger.info(`delete post_category ${postCategory.title}`);
  } catch (err) {
    next(error.createError(StatusCode.NOT_FOUND, err.message));
  }
};
