const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// In-memory user store
const users = [
  { id: 1, username: "admin", email: "admin@blog.com", password: "admin123", avatar: "👤" },
  { id: 2, username: "john", email: "john@blog.com", password: "john123", avatar: "🧑" }
];

let currentUser = null;

// Health check
app.get("/auth", (req, res) => {
  res.json({
    service: "Auth Service",
    message: "User authentication working",
    status: "online",
    currentUser: currentUser
  });
});

// Login
app.post("/auth/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    currentUser = { id: user.id, username: user.username, email: user.email, avatar: user.avatar };
    res.json({ success: true, message: "Login successful", user: currentUser });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// Register
app.post("/auth/register", (req, res) => {
  const { username, email, password } = req.body;
  
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ success: false, message: "Username already exists" });
  }
  
  const newUser = {
    id: users.length + 1,
    username,
    email,
    password,
    avatar: "🙂"
  };
  users.push(newUser);
  currentUser = { id: newUser.id, username: newUser.username, email: newUser.email, avatar: newUser.avatar };
  res.json({ success: true, message: "Registration successful", user: currentUser });
});

// Logout
app.post("/auth/logout", (req, res) => {
  currentUser = null;
  res.json({ success: true, message: "Logged out successfully" });
});

// Get current user
app.get("/auth/me", (req, res) => {
  if (currentUser) {
    res.json({ success: true, user: currentUser });
  } else {
    res.status(401).json({ success: false, message: "Not logged in" });
  }
});

app.listen(3001, "0.0.0.0", () => {
  console.log("Auth service running on port 3001");
});