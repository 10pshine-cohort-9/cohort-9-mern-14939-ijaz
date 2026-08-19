import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notes/new"
        element={
          <ProtectedRoute>
            <div className="p-8">Note editor coming soon</div>
          </ProtectedRoute>
        }
      />
      <Route
        path="/notes/:id"
        element={
          <ProtectedRoute>
            <div className="p-8">Note editor coming soon</div>
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
