import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-paper p-6 lg:p-10">
      <div className="flex items-center justify-between mb-10">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-graphite hover:text-ink transition-colors"
        >
          ← Back to notes
        </Link>
        <Button variant="ghost" onClick={handleLogout}>
          <span className="inline-flex items-center gap-2">
            <LogOut size={16} />
            Log out
          </span>
        </Button>
      </div>

      <h1 className="font-display text-2xl lg:text-3xl mb-8">Your profile</h1>

      <div className="max-w-2xl flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-moss text-white text-xl font-semibold leading-none shrink-0">
            {user.username?.[0]?.toUpperCase() ?? "?"}
          </span>
          <div>
            <p className="font-medium text-xl">{user.username}</p>
            <p className="text-sm text-graphite">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
