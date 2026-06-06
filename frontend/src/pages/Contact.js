import React, { useState } from "react";
import { toast } from "react-toastify";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill all required fields!");
      return;
    }

    // Here you can connect to your backend email API if needed
    console.log("Form submitted:", form);
    toast.success("Thank you! Your message has been sent successfully.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div>
      {/* Header Section */}
      <section
        className="text-center text-white py-5"
        style={{ background: "linear-gradient(120deg, #2e7d32, #66bb6a)" }}
      >
        <div className="container">
          <h1 className="fw-bold mb-3">Contact Us</h1>
          <p className="lead">
            Have questions or feedback? We’d love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            {/* Contact Info */}
            <div className="col-md-5 mb-4">
              <h3 className="text-success mb-4">Get in Touch</h3>
              <p className="text-muted">
                You can reach us through any of the following ways. We usually
                respond within 24 hours.
              </p>
              <ul className="list-unstyled text-muted">
                <li className="mb-2">
                  📍 <strong>Location:</strong> Mangalore, Karnataka, India
                </li>
                <li className="mb-2">
                  📧 <strong>Email:</strong> support@aicropdoctor.com
                </li>
                <li className="mb-2">
                  ☎️ <strong>Phone:</strong> +91 98765 43210
                </li>
              </ul>
              <div className="mt-4">
                <a
                  href="https://www.linkedin.com"
                  className="me-3 text-success fs-4"
                >
                  <i className="bi bi-linkedin"></i>
                </a>
                <a
                  href="https://www.github.com"
                  className="me-3 text-success fs-4"
                >
                  <i className="bi bi-github"></i>
                </a>
                <a
                  href="https://www.instagram.com"
                  className="text-success fs-4"
                >
                  <i className="bi bi-instagram"></i>
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="col-md-6">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <h4 className="text-success mb-3">Send a Message</h4>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Enter your name"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Subject</label>
                      <input
                        type="text"
                        name="subject"
                        className="form-control"
                        placeholder="Subject"
                        value={form.subject}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Message</label>
                      <textarea
                        name="message"
                        className="form-control"
                        placeholder="Your message..."
                        rows="4"
                        value={form.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-success w-100 fw-bold"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-white py-5">
        <div className="container text-center">
          <h3 className="text-success mb-4">Our Location</h3>
          <div className="ratio ratio-16x9 shadow-sm rounded">
            <iframe
              title="Mangalore Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3937.241081928041!2d74.8530!3d12.9141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba35a26f3d7649b%3A0xfcd93dfb7b024a2a!2sMangalore%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1699973308699!5m2!1sen!2sin"
              allowFullScreen
              loading="lazy"
              style={{ border: 0 }}
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
