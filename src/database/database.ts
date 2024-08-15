import Database from 'better-sqlite3';

const db = new Database('database.db');

// Create tables if they don't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS vouches (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT NOT NULL,
    rating INTEGER NOT NULL,
    user_id TEXT NOT NULL
  )
`);

export default db;