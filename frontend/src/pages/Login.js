import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";


export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/login", { email, password });
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", res.data.name);
        localStorage.setItem("email", res.data.email);
        toast.success("Login successful!");
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed!");
    }
  };

  // ✅ Handle Google login success
  const handleGoogleSuccess = (credentialResponse) => {
    const data = jwtDecode(credentialResponse.credential);

    console.log("Google user data:", data);

    // Store in localStorage like normal login
    localStorage.setItem("token", credentialResponse.credential);
    localStorage.setItem("user", data.name);
    localStorage.setItem("email", data.email);

    toast.success(`Welcome ${data.name}!`);
    navigate("/");
  };

  // ❌ Handle Google login failure
  const handleGoogleError = () => {
    toast.error("Google Sign-In Failed");
  };

  return (
    <div className="container py-5 text-center">
      <h3 className="text-success mb-3">Login</h3>

      <form
        onSubmit={handleLogin}
        className="card p-4 mx-auto shadow-sm"
        style={{ maxWidth: "400px" }}
      >
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-success w-100">
          Login
        </button>

        {/* 🔽 Add Google Sign-In button right below */}
        <div className="mt-4">
          <p className="text-muted mb-2">or continue with</p>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            width="300"
          />
        </div>
      </form>
    </div>
  );
}
