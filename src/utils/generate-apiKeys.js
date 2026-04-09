const crypto = require("crypto");

function generateApiKey(length) {
  const apiKey = crypto.randomBytes(length).toString("hex");
  return apiKey;
}

module.exports = { generateApiKey };
