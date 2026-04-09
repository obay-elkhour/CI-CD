const redis = require("../../config/redis");

async function increment(key) {
  const current = await redis.incr(key);

  if (current === 1) {
    await redis.expire(key, 60); // 60 seconds window
  }

  return current;
}

module.exports = { increment };
