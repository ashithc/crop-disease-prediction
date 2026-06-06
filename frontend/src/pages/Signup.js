import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (!agree) {
      toast.error("You must agree to the Terms and Privacy Policy!");
      return;
    }

    setLoading(true);
    try {
      const res = await API.post("/signup", { name, email, password });
      if (res.status === 201) {
        toast.success("Signup successful! Please login.");
        navigate("/login");
      }
    } catch (err) {
      // ✅ Improved error handling
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Signup failed due to an unexpected issue. Please try again.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Google Sign-Up Success
  const handleGoogleSuccess = (credentialResponse) => {
    const data = jwtDecode(credentialResponse.credential);

    localStorage.setItem("token", credentialResponse.credential);
    localStorage.setItem("user", data.name);
    localStorage.setItem("email", data.email);

    toast.success(`Welcome ${data.name}!`);
    navigate("/");
  };

  const handleGoogleError = () => {
    toast.error("Google Sign-In Failed");
  };

  return (
    <div className="container py-5 text-center">
      <h3 className="text-success mb-3">Sign Up</h3>

      <form
        onSubmit={handleSignup}
        className="card p-4 mx-auto shadow-sm"
        style={{ maxWidth: "450px" }}
      >
        {/* Name */}
        <div className="mb-3 text-start">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Email */}
        <div className="mb-3 text-start">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Phone */}
        <div className="mb-3 text-start">
          <label className="form-label">Phone (optional)</label>
          <input
            type="tel"
            className="form-control"
            placeholder="e.g., +91 9876543210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-3 text-start">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-3 text-start">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {/* Terms */}
        <div className="form-check text-start mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="agree"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            required
          />
          <label className="form-check-label" htmlFor="agree">
            I agree to the{" "}
            <a href="/terms" target="_blank" rel="noopener noreferrer">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>.
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-success w-100"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        {/* Divider + Google Sign-In */}
        <div className="mt-4">
          <p className="text-muted mb-2">or sign up with</p>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            width="320"
          />
        </div>
      </form>
    </div>
  );
}
