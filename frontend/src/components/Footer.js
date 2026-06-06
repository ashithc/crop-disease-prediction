import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-success text-white text-center py-4 mt-5">
      <div className="container">
        <div className="mb-3">
          <Link to="/" className="text-white me-3 text-decoration-none">Home</Link>
          <Link to="/about" className="text-white me-3 text-decoration-none">About</Link>
          <Link to="/detect" className="text-white me-3 text-decoration-none">Predict</Link>
          <Link to="/contact" className="text-white text-decoration-none">Contact</Link>
        </div>
        <p className="mb-2">🌿 Empowering Farmers with Artificial Intelligence 🌿</p>
        <p className="mb-0">&copy; 2025 AI Crop Doctor. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
