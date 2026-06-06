import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedEmail = localStorage.getItem("email") || "demo@email.com";
    setUser({
      name: savedUser || "User",
      email: savedEmail,
      password: "********",
    });
  }, []);

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => setEditMode(false);

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem("user", user.name);
    localStorage.setItem("email", user.email);
    toast.success("Profile updated successfully!");
    setEditMode(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("email");
    toast.info("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div className="container py-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "500px" }}>
        <h3 className="text-success text-center mb-3">My Profile</h3>

        {!editMode ? (
          <>
            <div className="text-center mb-4">
              <div
                className="bg-success text-white rounded-circle d-inline-flex justify-content-center align-items-center"
                style={{ width: "80px", height: "80px", fontSize: "2rem" }}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
            </div>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>

            <div className="d-flex justify-content-between mt-4">
              <button className="btn btn-outline-success" onClick={handleEdit}>Edit Profile</button>
              <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </div>
          </>
        ) : (
          <form onSubmit={handleSave}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                required
              />
            </div>
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-success">Save</button>
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
