import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true }); // 🔥 KEY FIX
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h2 className="logo">CampusMart</h2>

        <ul className="nav-links">
          {user && (
            <>
              <li>
                <Link to="">Home</Link>
              </li>

              <li>
                <Link to="/">Sell Item</Link>
              </li>

              <li>
                <Link to="/my-products">My Products</Link>
              </li>

              <li>
                <Link to="/lost-found">Lost & Found</Link>
              </li>

              <li>
                <Link to="/chatbot">Chatbot 🤖</Link>
              </li>
            </>
          )}

          {user?.role === "admin" && (
            <li>
              <Link to="/admin">Admin</Link>
            </li>
          )}

          {!user ? (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register" className="btn">
                  Register
                </Link>
              </li>
            </>
          ) : (
            <li>
              <button onClick={handleLogout} className="btn">
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
