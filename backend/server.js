const express = require("express");
const app = express();
const cors = require('cors');
const db = require('./database');

app.use(cors({ origin: 'http://localhost:3000' })); // Allow requests from Next.js frontend
app.use(express.json()); // Parse incoming JSON requests

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
    if (!row) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(row);
  });
});

// Create new post
app.post('/posts', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  const query = 'INSERT INTO posts (title, content) VALUES (?, ?)';
  db.run(query, [title, content], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: this.lastID });
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
