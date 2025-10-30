const express = require("express");
const router = express.Router();
const Note = require("../models/Note"); // make sure this path is correct

// ✅ Get all notes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Add a note
router.post("/", async (req, res) => {
  try {
    const { text } = req.body;
    const newNote = new Note({ text });
    const savedNote = await newNote.save();
    res.json(savedNote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update a note
router.put("/:id", async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { text: req.body.text },
      { new: true }
    );
    res.json(updatedNote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete single note
router.delete("/:id", async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Clear all notes
router.delete("/clear/all", async (req, res) => {
  try {
    await Note.deleteMany();
    res.json({ message: "All notes deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
