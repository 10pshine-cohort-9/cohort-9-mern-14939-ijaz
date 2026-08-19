import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
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
    <div className="min-h-screen bg-paper flex items-center justify-center p-6">
      <Card>
        <h1 className="font-display text-2xl mb-6">Your profile</h1>

        <div className="flex flex-col gap-4">
          <div>
            <p className="text-sm text-graphite">Username</p>
            <p className="text-lg">{user.username}</p>
          </div>

          <div>
            <p className="text-sm text-graphite">Email</p>
            <p className="text-lg">{user.email}</p>
          </div>
        </div>

        <Button variant="secondary" onClick={handleLogout} className="mt-8">
          Log out
        </Button>
      </Card>
    </div>
  );
}

export default Profile;
