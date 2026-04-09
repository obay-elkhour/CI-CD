const gatewayController = require("./getway.controller");
const apiKeyService = require("../api-key/apiKey.service");

async function routes(fastify) {
  // 🔑 create new API key
  fastify.post("/keys", async (request, reply) => {
    const { name, limit } = request.body;
    console.log(name, limit);

    if (!name || !limit) {
      return reply.code(400).send({
        error: "name and limit required",
      });
    }

    const keyData = apiKeyService.createApiKey({ name, limit });

    return reply.send(keyData);
  });

  // proxy route
  fastify.all("/api/*", gatewayController.handle);
}

module.exports = routes;
