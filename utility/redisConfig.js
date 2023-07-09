const redis = require("redis");
const logger = require("./logger");
const error = require("../utility/error");

const redisClient = redis.createClient({
  legacyMode: true,
  PORT: 6379,
});
redisClient.connect().catch(console.error);

const getOrSetCache = (key, cb) => {
  return new Promise((resolve, reject) => {
    redisClient.get(key, async (err, data) => {
      if (err) {
        next(error.createError(StatusCode.BAD_REQUEST, err.message));
      }
      if (data !== null) {
        logger.info("get Data from cache");
        resolve(JSON.parse(data));
      } else {
        const freshData = await cb();
        redisClient.setEx(key, 3600, JSON.stringify(freshData));
        resolve(freshData);
      }
    });
  });
};
module.exports = { redisClient, getOrSetCache };
