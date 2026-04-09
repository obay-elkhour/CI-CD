const fastify = require("fastify");

const gatewayRoutes = require("./modules/getway/getway.routes.js");
const apiKeyMiddleware = require("./modules/api-key/apiKey.middleware");
const rateLimit = require("./modules/rate-limit/rateLimit.middleware");

function buildApp() {
  const app = fastify({
    logger: true,
  });

  // register routes
  app.addHook("preHandler", apiKeyMiddleware);
  app.addHook("preHandler", rateLimit);

  app.register(gatewayRoutes);

  return app;
}

module.exports = buildApp;
