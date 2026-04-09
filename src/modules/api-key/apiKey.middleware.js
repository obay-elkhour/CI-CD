const apiKeyService = require("./apiKey.service");

async function apiKeyMiddleware(request, reply) {
  if (request.url.startsWith("/keys")) {
    return;
  }

  const apiKey = request.headers["x-api-key"];

  if (!apiKey) {
    return reply.code(401).send({ error: "API key required" });
  }

  const keyData = await apiKeyService.getApiKey(apiKey);

  if (!keyData) {
    return reply.code(403).send({ error: "Invalid API key" });
  }

  request.apiKey = keyData;
}

module.exports = apiKeyMiddleware;
