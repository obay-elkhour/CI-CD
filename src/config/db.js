const Database = require("better-sqlite3");

const db = new Database("data.db");

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS api_keys (
    key TEXT PRIMARY KEY,
    name TEXT,
    rate_limit INTEGER
  )
`,
).run();

module.exports = db;
