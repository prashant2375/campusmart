import { Link } from "react-router-dom";
import "./Navbar.css";

import { useAuth } from "../context/AuthContext";


function Navbar() {
  const { user, logout } = useAuth();


  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <h2 className="logo">CampusMart</h2>

        {/* Links */}
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>

          {user && <li><Link to="/add-product">Sell Item</Link></li>}
          {user && <li><Link to="/my-products">My Products</Link></li>}
          {user?.role === "admin" && <li><Link to="/admin">Admin</Link></li>}

          {!user ? (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register" className="btn">Register</Link></li>
            </>
          ) : (
            <li>
              <button onClick={logout} className="btn">Logout</button>
            </li>
          )}
        </ul>

      </div>
    </nav>
  );
}

export default Navbar;
