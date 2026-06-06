import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.info("Logged out successfully!");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm">
      <div className="container">
        <Link className="navbar-brand text-success fw-bold" to="/">🌿 AI Crop Doctor</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navmenu">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/how-it-works">How It Works</Link></li>
<li className="nav-item"><Link className="nav-link" to="/research">Research</Link></li>
<li className="nav-item"><Link className="nav-link" to="/blog">Blog</Link></li>

            {token && (
              <li className="nav-item">
                <Link className="nav-link" to="/detect">Detect</Link>
              </li>
            )}
            {token ? (
  <li className="nav-item dropdown ms-3">
    <a
      className="nav-link dropdown-toggle text-success"
      href="#"
      id="profileDropdown"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      👤 {user || "User"}
    </a>
    <ul className="dropdown-menu dropdown-menu-end">
      <li>
        <Link className="dropdown-item" to="/profile">View Profile</Link>
      </li>
      <li><hr className="dropdown-divider" /></li>
      <li>
        <button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button>
      </li>
    </ul>
  </li>
) : (
  <>
    <li className="nav-item ms-3">
      <Link className="btn btn-outline-success" to="/login">Login</Link>
    </li>
    <li className="nav-item ms-2">
      <Link className="btn btn-success text-white" to="/signup">Sign Up</Link>
    </li>
  </>
)}

          </ul>
        </div>
      </div>
    </nav>
  );
}
