import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;
  const [activeSection, setActiveSection] = useState("about");

  if (!result) {
    navigate("/detect");
    return null;
  }

  // Use data directly from backend result
  const info = {
    about: result.about || [],
    treatment: result.treatment || [],
    tips: result.tips || [],
  };

  return (
    <div
      style={{
        background: "url('/bgres.jpg') center/cover fixed no-repeat",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Header */}
      <section
        className="text-center text-white py-4"
        style={{
          background: "linear-gradient(120deg, #2e7d32, #66bb6a)",
        }}
      >
        <h1 className="fw-bold mb-2">
          {result.crop} - {result.disease}
        </h1>
        <p className="lead">
          Confidence Level: <strong>{result.confidence.toFixed(1)}%</strong>
        </p>
      </section>

      {/* Main Two-column Layout */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-start justify-content-center">
            {/* LEFT: Image */}
            <div className="col-md-5 text-center mb-4 mb-md-0">
              <div
                style={{
                  width: "100%",
                  maxWidth: "450px",
                  height: "400px",
                  margin: "auto",
                  borderRadius: "10px",
                  overflow: "hidden",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
                }}
              >
                <img
                  src={result.image || "/placeholder.jpg"}
                  alt="Leaf"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>

            {/* RIGHT: Toggles + Info */}
            <div className="col-md-6">
              {/* Toggle Buttons */}
              <div className="d-flex justify-content-center gap-3 mb-4 flex-wrap">
                <button
                  className={`btn ${activeSection === "about"
                    ? "btn-success"
                    : "btn-outline-success"
                    }`}
                  onClick={() => setActiveSection("about")}
                >
                  About
                </button>
                <button
                  className={`btn ${activeSection === "treatment"
                    ? "btn-success"
                    : "btn-outline-success"
                    }`}
                  onClick={() => setActiveSection("treatment")}
                >
                  Treatment
                </button>
                <button
                  className={`btn ${activeSection === "tips"
                    ? "btn-success"
                    : "btn-outline-success"
                    }`}
                  onClick={() => setActiveSection("tips")}
                >
                  Care Tips
                </button>
              </div>

              {/* Info Box */}
              <div
                className="p-4 rounded shadow-sm"
                style={{
                  backgroundColor: "#fff3cd",
                  minHeight: "300px",
                  borderRadius: "10px",
                }}
              >
                {activeSection === "about" && (
                  <div>
                    <h4 className="text-success mb-3">About the Disease</h4>
                    {info.about.map((line, i) => (
                      <p key={i} className="text-muted mb-1">
                        {i + 1}. {line}
                      </p>
                    ))}
                  </div>
                )}

                {activeSection === "treatment" && (
                  <div>
                    <h4 className="text-success mb-3">Treatment Options</h4>
                    {info.treatment.map((line, i) => (
                      <p key={i} className="text-muted mb-1">
                        {i + 1}. {line}
                      </p>
                    ))}
                  </div>
                )}

                {activeSection === "tips" && (
                  <div>
                    <h4 className="text-success mb-3">Care Tips</h4>
                    {info.tips.map((line, i) => (
                      <p key={i} className="text-muted mb-1">
                        {i + 1}. {line}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="text-center mt-5">
            <button
              className="btn btn-outline-success me-3"
              onClick={() => navigate("/detect")}
            >
              🔁 Try Another Image
            </button>
            <button
              className="btn btn-success"
              onClick={() => navigate("/")}
            >
              🏠 Go to Home
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="py-4 bg-success text-white text-center">
        <div className="container">
          <p className="mb-0">
            🌾 AI Crop Doctor — Empowering smarter and healthier farming.
          </p>
        </div>
      </section>
    </div>
  );
}
