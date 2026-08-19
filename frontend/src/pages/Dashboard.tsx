import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, User, LogOut } from "lucide-react";
import { fetchNotes, type Note } from "../api/notes";
import NoteCard from "../components/NoteCard";
import EmptyState from "../components/EmptyState";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";
import type { ApiError } from "../api/apiError";

const newNoteStyles =
  "inline-flex items-center gap-2 px-4 py-2 rounded-md font-medium cursor-pointer transition-colors bg-moss text-white hover:bg-moss-hover";

const logoutButtonStyles =
  "inline-flex items-center gap-2 px-4 py-2 rounded-md font-medium cursor-pointer transition-colors text-ink/70 hover:text-clay hover:bg-clay/5";

const profileLinkStyles =
  "inline-flex items-center gap-2 px-4 py-2 rounded-md font-medium cursor-pointer transition-colors bg-white border border-sand text-ink hover:bg-sand";

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
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <h1 className="font-display text-2xl lg:text-3xl">Your notes</h1>
        <div className="flex items-center gap-3">
          <Link to="/notes/new" className={newNoteStyles}>
            <Plus size={16} />
            New note
          </Link>
          <Link to="/profile" className={profileLinkStyles}>
            <User size={16} />
            Profile
          </Link>
          <Button
            variant="secondary"
            onClick={logout}
            className={logoutButtonStyles}
          >
            <LogOut size={16} />
            Log out
          </Button>
        </div>
      </div>

      {notes.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onDelete={(id) =>
                setNotes((prev) => prev.filter((n) => n.id !== id))
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
