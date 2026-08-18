import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { deleteNote, type Note } from "../api/notes";
import type { ApiError } from "../api/apiError";

type NoteCardProps = {
  note: Note;
  onDelete: (id: string) => void;
};

function NoteCard({ note, onDelete }: NoteCardProps) {
  async function handleDelete(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    const confirmed = window.confirm("Delete this note? This can't be undone.");
    if (!confirmed) return;

    try {
      await deleteNote(note.id);
      toast.success("Note deleted");
      onDelete(note.id);
    } catch (err) {
      toast.error((err as ApiError).message);
    }
  }

  return (
    <Link
      to={`/notes/${note.id}`}
      className="relative block bg-white rounded-lg shadow-md border border-sand p-5 hover:shadow-lg transition-shadow"
    >
      <button
        onClick={handleDelete}
        className="absolute top-3 right-3 text-sm text-clay hover:underline"
      >
        Delete
      </button>
      <h3 className="font-display text-lg mb-2 truncate pr-12">{note.title}</h3>
      <p className="text-sm text-graphite line-clamp-3">{note.content}</p>
    </Link>
  );
}

export default NoteCard;
