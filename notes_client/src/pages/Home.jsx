import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const API_BASE = "http://localhost:8080/api/notes"; 

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const [notes, setNotes] = useState([]);

  // Load notes on mount
  useEffect(() => {
    if (user) {
      axios
        .get(`${API_BASE}/${user?.userName}`)
        .then((res) => setNotes(res.data))
        .catch((err) => console.error("Error fetching notes:", err));
    }
  }, [user]);

  // Add new note
  const addNote = async () => {
    try {
      const res = await axios.post(API_BASE, {
        user:user?.userName,
        header: "New Note",
        body: "",
      });
      setNotes([...notes, res.data]);
    } catch (err) {
      console.error("Error adding note:", err);
    }
  };

  // Update note
  const updateNote = async (index, field, value) => {
    try {
      const updatedNote = { ...notes[index], [field]: value };
      setNotes((prev) =>
        prev.map((n, i) => (i === index ? updatedNote : n))
      );

      await axios.put(`${API_BASE}/${updatedNote.id}`, updatedNote);
    } catch (err) {
      console.error("Error updating note:", err);
    }
  };

  // Delete note
  const deleteNote = async (index) => {
    try {
      const noteId = notes[index].id;
      await axios.delete(`${API_BASE}/${noteId}`);
      setNotes(notes.filter((_, i) => i !== index));
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-6">
      {/* Add Note Button */}
      <div
        onClick={addNote}
        className="w-40 h-40 border-2 border-dashed border-gray-400 flex flex-col items-center justify-center text-xl cursor-pointer mb-8 rounded-lg bg-yellow-200 hover:bg-yellow-300 shadow-md"
      >
        <span className="font-bold underline mb-2">Add Note</span>
        <span className="text-3xl">+</span>
      </div>

      {/* Notes List */}
      <div className="w-full max-w-full flex flex-wrap gap-8 justify-center flex-col sm:flex-row">
        {notes.map((note, index) => (
          <div
            key={note.id || index}
            className="p-4 border rounded-lg shadow-lg bg-yellow-200 flex flex-col min-w-[400px] min-h-[200px] relative"
          >
            {/* Editable Header */}
            <input
              type="text"
              value={note.header}
              onChange={(e) => updateNote(index, "header", e.target.value)}
              className="font-bold text-lg underline bg-transparent w-full focus:outline-none mb-2"
            />

            {/* Editable Body */}
            <textarea
              value={note.body}
              onChange={(e) => updateNote(index, "body", e.target.value)}
              placeholder="Note body.."
              className="text-gray-700 bg-transparent w-full focus:outline-none resize-none flex-1 overflow-y-auto"
              rows={3}
            />
            <button
              onClick={() => deleteNote(index)}
              className="absolute top-3 right-3 text-red-600 font-bold text-lg"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
