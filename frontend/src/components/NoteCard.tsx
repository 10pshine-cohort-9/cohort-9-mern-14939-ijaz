import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { deleteNote, type Note } from "../api/notes";
import type { ApiError } from "../api/apiError";

type NoteCardProps = {
  note: Note;
  onDelete: (id: string) => void;
};

function stripHtml(html: string): string {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || "";
}

function NoteCard({ note, onDelete }: NoteCardProps) {
  async function handleDelete() {
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
    <div className="relative bg-white rounded-lg shadow-md border border-sand p-5 hover:shadow-lg transition-shadow">
      <button
        onClick={handleDelete}
        className="absolute top-3 right-3 text-sm text-clay hover:underline cursor-pointer"
      >
        Delete
      </button>
      <Link to={`/notes/${note.id}`} className="block">
        <h3 className="font-display text-lg mb-2 truncate pr-12">
          {note.title}
        </h3>
        <p className="text-sm text-graphite line-clamp-3">
          {stripHtml(note.content)}
        </p>
      </Link>
    </div>
  );
}

export default NoteCard;
