const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./blog.db'); // Use a file-based database instead of in-memory

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, content TEXT NOT NULL)");
});

module.exports = db;