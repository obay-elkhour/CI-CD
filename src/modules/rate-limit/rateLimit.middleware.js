const rateLimitService = require("./rateLimit.service");

async function rateLimit(request, reply) {
  // skip public routes
  if (!request.apiKey) return;

  const keyName = request.apiKey.name;
  const limit = request.apiKey.limit;

  const redisKey = `rate:${keyName}`;

  const count = await rateLimitService.increment(redisKey);

  if (count > limit) {
    return reply.code(429).send({ error: "Rate limit exceeded" });
  }
}

module.exports = rateLimit;
