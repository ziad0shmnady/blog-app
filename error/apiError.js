const BaseError = require("./baseError");
class ApiError extends BaseError {
  constructor(name, statusCode, description) {
    super(name, statusCode, description);
  }
}

module.exports = ApiError;
