class BaseError extends Error {
  constructor(name, statusCode, description) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);
    this.statusCode = statusCode;
    this.name = name;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = BaseError;
