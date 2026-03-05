const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// In-memory posts store
const posts = [
  { id: 1, title: "Welcome to Microservices Blog", content: "This is a demo blog built with microservices architecture using Node.js, Docker, and Kubernetes.", author: "admin", createdAt: new Date().toISOString(), likes: 12, category: "Technology" },
  { id: 2, title: "Getting Started with Docker", content: "Docker containers make it easy to deploy and scale applications. Learn the basics of containerization.", author: "john", createdAt: new Date().toISOString(), likes: 8, category: "DevOps" },
  { id: 3, title: "Kubernetes for Beginners", content: "Kubernetes helps you manage containerized applications at scale. Let's explore its core concepts.", author: "admin", createdAt: new Date().toISOString(), likes: 15, category: "DevOps" }
];

// Health check
app.get("/posts/health", (req, res) => {
  res.json({ service: "Post Service", status: "online" });
});

// Get all posts
app.get("/posts", (req, res) => {
  res.json({
    service: "Post Service",
    count: posts.length,
    posts: posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  });
});

// Get single post
app.get("/posts/:id", (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (post) {
    res.json({ success: true, post });
  } else {
    res.status(404).json({ success: false, message: "Post not found" });
  }
});

// Create post
app.post("/posts", (req, res) => {
  const { title, content, author, category } = req.body;
  
  if (!title || !content) {
    return res.status(400).json({ success: false, message: "Title and content are required" });
  }
  
  const newPost = {
    id: posts.length + 1,
    title,
    content,
    author: author || "Anonymous",
    category: category || "General",
    createdAt: new Date().toISOString(),
    likes: 0
  };
  
  posts.push(newPost);
  res.status(201).json({ success: true, message: "Post created", post: newPost });
});

// Like a post
app.post("/posts/:id/like", (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (post) {
    post.likes++;
    res.json({ success: true, likes: post.likes });
  } else {
    res.status(404).json({ success: false, message: "Post not found" });
  }
});

// Delete post
app.delete("/posts/:id", (req, res) => {
  const index = posts.findIndex(p => p.id === parseInt(req.params.id));
  if (index !== -1) {
    posts.splice(index, 1);
    res.json({ success: true, message: "Post deleted" });
  } else {
    res.status(404).json({ success: false, message: "Post not found" });
  }
});

app.listen(3002, "0.0.0.0", () => {
  console.log("Post service running on port 3002");
});