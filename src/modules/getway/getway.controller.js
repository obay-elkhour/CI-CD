const gatewayService = require("./getway.service");

async function handle(request, reply) {
  return gatewayService.forward(request, reply);
}

module.exports = { handle };
