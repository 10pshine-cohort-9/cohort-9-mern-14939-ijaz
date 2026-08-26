import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
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

function NoteCard({ note, onDelete }: Readonly<NoteCardProps>) {
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
    <div className="group relative bg-white rounded-lg shadow-md border border-sand p-5 pb-14 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
      <Link to={`/notes/${note.id}`} className="block">
        <h3 className="font-display text-lg mb-2 truncate">{note.title}</h3>
        <p className="text-sm text-graphite line-clamp-3 wrap-break-word">
          {stripHtml(note.content)}
        </p>
      </Link>
      <button
        type="button"
        onClick={handleDelete}
        className="absolute bottom-3 right-3 flex items-center gap-1 text-sm text-clay hover:underline cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
      >
        <Trash2 size={14} />
        Delete
      </button>
    </div>
  );
}

export default NoteCard;
