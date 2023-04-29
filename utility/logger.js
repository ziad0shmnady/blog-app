const winston = require("winston");

// Define the logger configuration
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.json()
  ),
  defaultMeta: { service: "my-node-app" },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logger.log" }),
  ],
});

// Export the logger for use in other files
module.exports = logger;
