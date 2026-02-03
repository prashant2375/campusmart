import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  // 🔒 Not logged in → kick to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 🔒 Admin-only route protection
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
