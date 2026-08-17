import { Link } from "react-router-dom";
import Button from "./Button";

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <h2 className="font-display text-2xl mb-2">No notes yet</h2>
      <p className="text-graphite mb-6">
        Start writing down your first thought.
      </p>
      <Link to="/notes/new">
        <Button>Create your first note</Button>
      </Link>
    </div>
  );
}

export default EmptyState;
