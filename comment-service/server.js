const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// In-memory comments store
const comments = [
  { id: 1, postId: 1, text: "This is an amazing introduction to microservices!", author: "john", createdAt: new Date().toISOString(), avatar: "🧑" },
  { id: 2, postId: 1, text: "Great work! Looking forward to more content.", author: "admin", createdAt: new Date().toISOString(), avatar: "👤" },
  { id: 3, postId: 2, text: "Docker is really changing the way we deploy apps!", author: "john", createdAt: new Date().toISOString(), avatar: "🧑" },
  { id: 4, postId: 3, text: "Kubernetes is a must-learn for modern developers.", author: "admin", createdAt: new Date().toISOString(), avatar: "👤" }
];

// Health check
app.get("/comments/health", (req, res) => {
  res.json({ service: "Comment Service", status: "online" });
});

// Get all comments
app.get("/comments", (req, res) => {
  res.json({
    service: "Comment Service",
    count: comments.length,
    comments: comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  });
});

// Get comments for a specific post
app.get("/comments/post/:postId", (req, res) => {
  const postComments = comments.filter(c => c.postId === parseInt(req.params.postId));
  res.json({
    success: true,
    postId: parseInt(req.params.postId),
    count: postComments.length,
    comments: postComments
  });
});

// Add comment
app.post("/comments", (req, res) => {
  const { postId, text, author, avatar } = req.body;
  
  if (!postId || !text) {
    return res.status(400).json({ success: false, message: "Post ID and text are required" });
  }
  
  const newComment = {
    id: comments.length + 1,
    postId: parseInt(postId),
    text,
    author: author || "Anonymous",
    avatar: avatar || "🙂",
    createdAt: new Date().toISOString()
  };
  
  comments.push(newComment);
  res.status(201).json({ success: true, message: "Comment added", comment: newComment });
});

// Delete comment
app.delete("/comments/:id", (req, res) => {
  const index = comments.findIndex(c => c.id === parseInt(req.params.id));
  if (index !== -1) {
    comments.splice(index, 1);
    res.json({ success: true, message: "Comment deleted" });
  } else {
    res.status(404).json({ success: false, message: "Comment not found" });
  }
});

app.listen(3003, "0.0.0.0", () => {
  console.log("Comment service running on port 3003");
});