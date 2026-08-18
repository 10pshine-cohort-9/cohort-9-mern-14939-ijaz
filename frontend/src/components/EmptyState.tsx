import { Link } from "react-router-dom";

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <h2 className="font-display text-2xl mb-2">No notes yet</h2>
      <p className="text-graphite mb-6">
        Start writing down your first thought.
      </p>
      <Link
        to="/notes/new"
        className="inline-block px-4 py-2 rounded-md font-medium cursor-pointer transition-colors bg-moss text-white hover:bg-moss-hover"
      >
        Create your first note
      </Link>
    </div>
  );
}

export default EmptyState;
