import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleGetStarted = () => {
    navigate(isLoggedIn ? "/detect" : "/signup");
  };

  return (
    <div>
      {/* Hero Section */}
      <section
        className="text-dark text-center text-md-start py-5"
        style={{
          background: "linear-gradient(120deg, #e8f5e9, #f1f8e9)",
        }}
      >
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="display-5 fw-bold text-success mb-3 animate__animated animate__fadeInDown">
                AI Crop Doctor
              </h1>
              <p className="lead mb-4 animate__animated animate__fadeInUp">
                Detect crop diseases instantly using Artificial Intelligence.
                Upload a leaf photo and get accurate predictions with recommended treatments.
              </p>
              <button onClick={handleGetStarted} className="btn btn-success btn-lg px-4">
                {isLoggedIn ? "Start Detection" : "Get Started"}
              </button>
            </div>
            <div className="col-md-6 text-center">
              <img
                src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1200"
                alt="Leaf"
                className="img-fluid rounded shadow-sm"
                style={{ maxHeight: "380px", borderRadius: "20px" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-white">
        <div className="container text-center">
          <h2 className="text-success mb-4">Why Choose AI Crop Doctor?</h2>
          <div className="row">
            {[
              {
                icon: "🌾",
                title: "AI-Powered Diagnosis",
                text: "Detect leaf diseases in seconds using deep learning.",
              },
              {
                icon: "📷",
                title: "Instant Predictions",
                text: "Simply upload a photo — get disease name & confidence score.",
              },
              {
                icon: "💊",
                title: "Treatment Advice",
                text: "Get tailored solutions and prevention tips.",
              },
              {
                icon: "🧠",
                title: "Research-Backed Model",
                text: "Built using the trusted PlantVillage dataset.",
              },
            ].map((f, i) => (
              <div className="col-md-3 mb-4" key={i}>
                <div className="card shadow-sm border-0 h-100">
                  <div className="card-body">
                    <div style={{ fontSize: "2rem" }}>{f.icon}</div>
                    <h5 className="mt-3 text-success">{f.title}</h5>
                    <p className="text-muted small">{f.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Preview */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="text-success mb-4">How It Works</h2>
          <div className="row">
            <div className="col-md-4">
              <h1>📤</h1>
              <h5>Upload Leaf Image</h5>
            </div>
            <div className="col-md-4">
              <h1>⚙️</h1>
              <h5>AI Analyzes Disease</h5>
            </div>
            <div className="col-md-4">
              <h1>📊</h1>
              <h5>Get Results & Treatments</h5>
            </div>
          </div>
          <Link to="/how-it-works" className="btn btn-outline-success mt-4">
            Learn More
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-5 bg-white">
        <div className="container text-center">
          <h2 className="text-success mb-4">What Our Users Say</h2>
          <blockquote className="blockquote">
            <p className="mb-3">
              “AI Crop Doctor helped me detect early leaf blight in my pepper crops.
              It saved my entire yield!”
            </p>
            <footer className="blockquote-footer">
              Ramesh, <cite title="Location">Mangalore, India</cite>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-5 bg-success text-white text-center">
        <div className="container">
          <h3 className="fw-light">
            Join thousands of farmers using AI Crop Doctor.
          </h3>
          <p className="lead">Detect and prevent crop diseases before they spread.</p>
          <button
            className="btn btn-light mt-3 px-4"
            onClick={handleGetStarted}
          >
            Start Detection
          </button>
        </div>
      </section>
    </div>
  );
}
