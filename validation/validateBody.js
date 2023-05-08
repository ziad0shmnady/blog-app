const { z } = require("zod");

function validateBody(schema) {
  return (req, res, next) => {
    try {
      const validatedData = schema.parse(req.body);
      req.body = validatedData;
      next();
    } catch (error) {
      // If the error is a Zod error, return an error message to the client
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((error) => error.message);
        res.status(400).json({ errors: errorMessages });
      } else {
        // Otherwise, pass the error to the default error handler
        next(error);
      }
    }
  };
}

module.exports = { validateBody };
