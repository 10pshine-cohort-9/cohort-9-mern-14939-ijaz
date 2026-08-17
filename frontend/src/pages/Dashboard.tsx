import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchNotes } from "../api/notes";
import NoteCard from "../components/NoteCard";
import EmptyState from "../components/EmptyState";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";

type Note = {
  id: string;
  title: string;
  content: string;
};

function Dashboard() {
  const { logout } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotes()
      .then((data) => setNotes(data.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-paper p-6 lg:p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-2xl lg:text-3xl">Your notes</h1>
        <div className="flex gap-3">
          <Link to="/notes/new">
            <Button>New note</Button>
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
