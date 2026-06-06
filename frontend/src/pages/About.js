import React from "react";

export default function About() {
  return (
    <div>
      {/* Header Section */}
      <section
        className="text-center text-white py-5"
        style={{ background: "linear-gradient(120deg, #2e7d32, #66bb6a)" }}
      >
        <div className="container">
          <h1 className="fw-bold mb-3">About AI Crop Doctor</h1>
          <p className="lead">
            Empowering farmers and researchers through Artificial Intelligence and innovation.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="text-success mb-4">Our Mission</h2>
          <p className="fs-5 text-muted mx-auto" style={{ maxWidth: "800px" }}>
            Our mission is to leverage Artificial Intelligence to help farmers
            identify plant diseases early and take preventive measures to
            maximize crop yield and reduce losses. We believe technology can
            transform agriculture — making it smarter, more sustainable, and
            accessible for everyone.
          </p>
        </div>
      </section>

      {/* Vision & Technology Section */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <img
  src="https://images.unsplash.com/photo-1535379453347-1ffd615e2e08?q=80&w=1200&auto=format&fit=crop"
  alt="AI Agriculture"
  className="img-fluid rounded shadow-sm"
/>
            </div>
            <div className="col-md-6">
              <h2 className="text-success mb-3">Innovation & Technology</h2>
              <p className="text-muted">
                AI Crop Doctor uses state-of-the-art **Deep Learning** and
                **Convolutional Neural Networks (CNN)** trained on thousands of
                high-quality leaf images from datasets such as PlantVillage.
                <br />
                <br />
                The model analyzes the uploaded leaf image and predicts
                the disease type, confidence level, and recommended treatment
                — all within seconds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Used */}
      <section className="py-5 bg-light text-center">
        <div className="container">
          <h2 className="text-success mb-4">Technologies We Use</h2>
          <div className="row">
            {[
              { name: "React.js", icon: "⚛️" },
              { name: "Flask", icon: "🔥" },
              { name: "Python", icon: "🐍" },
              { name: "TensorFlow", icon: "🧠" },
              { name: "Bootstrap", icon: "💻" },
              { name: "SQLite", icon: "🗄️" },
            ].map((tech, index) => (
              <div key={index} className="col-6 col-md-4 mb-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <div style={{ fontSize: "2rem" }}>{tech.icon}</div>
                    <h5 className="mt-3">{tech.name}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-5 bg-white text-center">
        <div className="container">
          <h2 className="text-success mb-4">Meet the Team</h2>
          <div className="row justify-content-center">
            {[

              {
                name: "Ashray K",
               // role: "Model developer",
                img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
              },

              {
                name: "Adithya Maradithaya",
                //role: "FullStack Developer,ML Developer,Tester",
                img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
              },
              {
                name: "Ashith C",
                //role: "Frontend Developer",
                img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
              },
              {
                name: "Ankith Kumar",
                //role: "Backend Developer",
                img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
              },
              
              
            ].map((member, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="rounded-circle mb-3"
                      width="90"
                      height="90"
                    />
                    <h5 className="fw-bold">{member.name}</h5>
                    <p className="text-muted mb-1">{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-5 text-white text-center" style={{ background: "#2e7d32" }}>
        <div className="container">
          <h3 className="fw-light mb-3">
            Together, we’re shaping the future of smart farming 🌱
          </h3>
          <p>Join us in empowering farmers with the power of Artificial Intelligence.</p>
        </div>
      </section>
    </div>
  );
}
