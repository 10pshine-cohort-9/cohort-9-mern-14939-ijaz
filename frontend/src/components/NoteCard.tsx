import { Link } from "react-router-dom";

type Note = {
  id: string;
  title: string;
  content: string;
};

function NoteCard({ note }: { note: Note }) {
  return (
    <Link
      to={`/notes/${note.id}`}
      className="block bg-white rounded-lg shadow-md border border-sand p-5 hover:shadow-lg transition-shadow"
    >
      <h3 className="font-display text-lg mb-2 truncate">{note.title}</h3>
      <p className="text-sm text-graphite line-clamp-3">{note.content}</p>
    </Link>
  );
}

export default NoteCard;
