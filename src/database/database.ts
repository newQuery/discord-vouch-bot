import fs from 'fs';
import path from 'path';
import Database from 'better-sqlite3';

// Define the database file path
const dbFilePath = path.resolve('database.db');

// Check if the database file exists, if not create it
if (!fs.existsSync(dbFilePath)) {
  console.log('Database not found, creating new database...');
}

// Initialize the SQLite database
const db = new Database(dbFilePath);

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
