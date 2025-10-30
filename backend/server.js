require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// 🧩 Debug line — check if MONGO_URI is being read correctly
console.log("🔍 MONGO_URI from .env =", process.env.MONGO_URI);

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Import and use routes
const notesRouter = require("./routes/notes");
app.use("/notes", notesRouter);

// ✅ Default test route
app.get("/", (req, res) => {
  res.send("QuickNotes Backend is running 🚀");
});

// ✅ Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
