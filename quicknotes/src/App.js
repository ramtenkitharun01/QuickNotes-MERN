import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [editId, setEditId] = useState(null); // ✅ For editing

  // ✅ Fetch all notes
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/notes");
      setNotes(res.data);
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };

  // ✅ Add or Update Note
  const addOrUpdateNote = async () => {
    if (!text.trim()) return;

    try {
      if (editId) {
        // ✏️ Update existing note
        const res = await axios.put(`http://localhost:5000/notes/${editId}`, { text });
        setNotes(notes.map((note) => (note._id === editId ? res.data : note)));
        setEditId(null);
      } else {
        // ➕ Add new note
        const res = await axios.post("http://localhost:5000/notes", { text });
        setNotes([...notes, res.data]);
      }
      setText("");
    } catch (err) {
      console.error("Error adding/updating note:", err);
    }
  };

  // ✅ Delete single note
  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/notes/${id}`);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  // ✅ Clear all notes
  const clearAllNotes = async () => {
    if (window.confirm("Are you sure you want to delete all notes?")) {
      try {
        await axios.delete("http://localhost:5000/notes/clear");
        setNotes([]);
      } catch (err) {
        console.error("Error clearing notes:", err);
      }
    }
  };

  // ✅ Enable Edit Mode
  const startEditing = (note) => {
    setEditId(note._id);
    setText(note.text);
  };

  // ✅ Search filter
  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <div className="header">
        <h1>📝 QuickNotes</h1>
        <div className="actions">
          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </div>

      <div className="note-input">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your note here..."
        ></textarea>
        <button onClick={addOrUpdateNote}>
          {editId ? "💾 Update Note" : "Add Note"}
        </button>
      </div>

      <div className="note-list">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <div key={note._id} className="note-card">
              <p>{note.text}</p>
              <div className="note-actions">
                <button className="edit" onClick={() => startEditing(note)}>
                  ✏️
                </button>
                <button className="delete" onClick={() => deleteNote(note._id)}>
                  ❌
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="empty">No notes found</p>
        )}
      </div>

      {notes.length > 0 && (
        <button className="clear-all" onClick={clearAllNotes}>
          🗑️ Clear All Notes
        </button>
      )}
    </div>
  );
}

export default App;
