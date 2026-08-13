import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={<div className="p-8">Dashboard coming soon</div>}
      />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
