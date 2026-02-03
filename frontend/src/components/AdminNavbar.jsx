import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminNavbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-container">
        <h2 className="admin-logo">CampusMart • Admin</h2>

        <button onClick={handleLogout} className="admin-btn">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default AdminNavbar;
