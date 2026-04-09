const axios = require("axios");

async function forward(request, reply) {
  try {
    // remove /api prefix
    const path = request.url.replace(/^\/api/, "");

    const targetUrl = "https://jsonplaceholder.typicode.com" + path;

    const response = await axios({
      method: request.method,
      url: targetUrl,
      data: request.body,
      headers: {
        ...request.headers,
        host: undefined, // avoid conflicts
      },
    });

    return reply.send(response.data);
  } catch (err) {
    console.error(err.message);

    return reply.code(500).send({
      error: "Proxy failed",
    });
  }
}

module.exports = { forward };
