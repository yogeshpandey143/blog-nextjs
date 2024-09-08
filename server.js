const express = require("express");
const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database');
app.use(cors({ origin: 'http://localhost:3000' })); // Allow requests from Next.js frontend
app.use(express.json());

const db = require('./database');



app.use(cors());
app.use(bodyParser.json());


const db = new sqlite3.Database('./blog.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  }
});

// Create posts table
db.run(`CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL
)`);




// API Endpoints

// Get all posts
app.get('/posts', (req, res) => {
  db.all('SELECT * FROM posts', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Get post by ID
app.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM posts WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(row);
  });
});

// Create new post
app.post('/posts', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    res.status(400).json({ error: 'Title and content are required' });
    return;
  }

  const query = 'INSERT INTO posts (title, content) VALUES (?, ?)';
  db.run(query, [title, content], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});

// Delete post
app.delete('/posts/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM posts WHERE id = ?', id, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ deleted: true });
  });
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});