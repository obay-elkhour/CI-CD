const { nanoid } = require("nanoid");
const db = require("../../config/db");
const redis = require("../../config/redis");

// create key → store in DB
function createApiKey({ name, limit }) {
  const key = nanoid(32);

  db.prepare(
    `
    INSERT INTO api_keys (key, name, rate_limit)
    VALUES (?, ?, ?)
  `,
  ).run(key, name, limit);

  return { key, name, limit };
}

// 🔥 main logic: cache → db
async function getApiKey(key) {
  // 1. check Redis
  const cached = await redis.get(`apiKey:${key}`);

  if (cached) {
    console.log("from cache");
    return JSON.parse(cached);
  }

  // 2. fallback to DB
  const row = db
    .prepare(
      `
    SELECT * FROM api_keys WHERE key = ?
  `,
    )
    .get(key);

  if (!row) return null;

  console.log("from DB");

  // 3. store in cache (TTL optional)
  await redis.set(
    `apiKey:${key}`,
    JSON.stringify(row),
    "EX",
    60, // cache 1 min
  );

  return row;
}

module.exports = {
  createApiKey,
  getApiKey,
};
