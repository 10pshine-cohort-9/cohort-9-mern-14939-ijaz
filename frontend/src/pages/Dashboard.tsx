import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchNotes, type Note } from "../api/notes";
import NoteCard from "../components/NoteCard";
import EmptyState from "../components/EmptyState";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";
import type { ApiError } from "../api/apiError";

const linkButtonStyles =
  "inline-block px-4 py-2 rounded-md font-medium bg-moss text-white hover:bg-moss-hover";

function Dashboard() {
  const { logout } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function loadNotes() {
    setLoading(true);
    setError("");
    fetchNotes()
      .then((data) => setNotes(data.data))
      .catch((err) => setError((err as ApiError).message))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadNotes();
  }, []);

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-8 flex flex-col items-center gap-4">
        <p className="text-clay">{error}</p>
        <Button onClick={loadNotes}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper p-6 lg:p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-2xl lg:text-3xl">Your notes</h1>
        <div className="flex gap-3">
          <Link to="/notes/new" className={linkButtonStyles}>
            New note
          </Link>
          <Button variant="secondary" onClick={logout}>
            Log out
          </Button>
        </div>
      </div>

      {notes.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
