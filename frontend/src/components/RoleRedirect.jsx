import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RoleRedirect() {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) return <Navigate to="/login" replace />;

  if (user.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return <Navigate to="/products" replace />;
}

export default RoleRedirect;
