import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "./models/User.js";
import Todo from "./models/Todo.js";
import { requireLogin } from "./middleware/auth.js";

const app = express();

// --- REMOVE dotenv ---

// --- ADD VALUES DIRECTLY HERE ---
const MONGO_URL = "mongodb://localhost:27017/todoapp";  // your database URL
const SESSION_SECRET = "mysecret123";                  // your secret key


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// SESSION WITHOUT .env
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
  })
);

app.use(express.static("public"));

// DATABASE CONNECT
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// REGISTER
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  try {
    await User.create({ username, password: hashed });
    res.json({ message: "User registered" });
  } catch {
    res.json({ error: "Username already exists" });
  }
});

// LOGIN
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.json({ error: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.json({ error: "Invalid credentials" });

  req.session.userId = user._id;
  res.json({ message: "Login successful" });
});

// GET TODOS
app.get("/todos", requireLogin, async (req, res) => {
  const todos = await Todo.find({ userId: req.session.userId });
  res.json(todos);
});

// ADD TODO
app.post("/todos", requireLogin, async (req, res) => {
  const todo = await Todo.create({
    userId: req.session.userId,
    text: req.body.text,
    completed: false
  });
  res.json(todo);
});

// UPDATE TODO
app.put("/todos/:id", requireLogin, async (req, res) => {
  const todo = await Todo.findOneAndUpdate(
    { _id: req.params.id, userId: req.session.userId },
    req.body,
    { new: true }
  );
  res.json(todo);
});

// DELETE TODO
app.delete("/todos/:id", requireLogin, async (req, res) => {
  await Todo.deleteOne({ _id: req.params.id, userId: req.session.userId });
  res.json({ message: "Deleted" });
});

// LOGOUT
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.json({ message: "Logged out" });
});

// START SERVER
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
