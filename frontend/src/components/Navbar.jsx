import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <h2 className="logo">CampusMart</h2>

        {/* Links */}
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/add-product">Sell Item</Link></li>
          <li><Link to="/my-products">My Products</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register" className="btn">Register</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
