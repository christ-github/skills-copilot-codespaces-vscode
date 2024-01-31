// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

// Create express app
const app = express();

// Use body parser
app.use(bodyParser.json());
app.use(cors());

// Comments object
const commentsByPostId = {};

// Get all comments for post
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// Create a comment
app.post('/posts/:id/comments', (req, res) => {
  // Create a random id
  const commentId = randomBytes(4).toString('hex');

  // Get the comment text from the request body
  const { content } = req.body;

  // Get the comments for the post
  const comments = commentsByPostId[req.params.id] || [];

  // Push the new comment into the comments array
  comments.push({ id: commentId, content, status: 'pending' });

  // Store the comments array in the comments object
  commentsByPostId[req.params.id] = comments;

  // Send the comment back to the user
  res.status(201).send(comments);
});

// Listen on port 4001
app.listen(4001, () => {
  console.log('Listening on 4001');
});
