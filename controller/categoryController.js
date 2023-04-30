const Category = require("../model/categoryModel");
const StatusCode = require("../utility/statusCode");
const error = require("../utility/error");
const { Op } = require("sequelize");
const logger = require("../utility/logger");

exports.getAllCategory = async (req, res, next) => {
  try {
    const result = await Category.findAll();
    logger.info("get all category");
    res.status(StatusCode.SUCCESS).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(error.createError(StatusCode.NOT_FOUND, err.message));
  }
};

exports.getCategoryById = async (req, res, next) => {
  try {
    const result = await Category.findByPk(req.params.id);
    if (!result) {
      next(error.createError(StatusCode.NOT_FOUND, "Category not found"));
    }
    res.status(StatusCode.SUCCESS).json({
      success: true,
      data: result,
    });
    logger.info(`get category ${result.name} by id`);
  } catch (err) {
    next(error.createError(StatusCode.NOT_FOUND, err.message));
  }
};
exports.createCategory = async (req, res, next) => {
  const { name } = req.body;
  const category = await Category.findOne({
    where: { [Op.or]: [{ name: name }] },
  });
  if (category) {
    next(error.createError(StatusCode.BAD_REQUEST, "Name already exists"));
  }
  try {
    const result = await Category.create({
      name,
    });
    res.status(StatusCode.CREATED).json({
      success: true,
      data: result,
    });
    logger.info(`create category ${result.name}`);
  } catch (err) {
    next(error.createError(StatusCode.BAD_REQUEST, err.message));
  }
};

exports.updateCategory = async (req, res, next) => {
  const { name } = req.body;
  try {
    const result = await Category.update(
      {
        name,
      },
      {
        where: { category_id: req.params.id },
        returning: true,
        plain: true,
      }
    );
    if (!result) {
      next(error.createError(StatusCode.NOT_FOUND, "Category not found"));
    }
    res.status(StatusCode.SUCCESS).json({
      success: true,
      data: result,
    });
    logger.info(`update category ${result.name}`);
  } catch (err) {
    next(error.createError(StatusCode.BAD_REQUEST, err.message));
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      next(error.createError(StatusCode.NOT_FOUND, "Category not found"));
    }
    await category.destroy();
    res.status(StatusCode.SUCCESS).json({
      success: true,
      data: category,
    });
    logger.info(`delete category ${category.name}`);
  } catch (err) {
    next(error.createError(StatusCode.BAD_REQUEST, err.message));
  }
};
