import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import API from "../api";

export default function Detect() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🔹 Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // 🔹 Predict Function
  const handlePredict = async () => {
    if (!image) {
      toast.error("Please upload a leaf image first!");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", image);

      const response = await API.post("/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Navigate to Result page with data
      navigate("/result", { state: { result: { ...response.data, image: preview } } });
    } catch (err) {
      console.error(err);
      const errorMsg = err.response?.data?.message || "Prediction failed. Please try again.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Reset
  const handleReset = () => {
    setImage(null);
    setPreview(null);
  };

  return (
    <div>
      {/* Header */}
      <section
        className="text-center text-white py-5"
        style={{ background: "linear-gradient(120deg, #2e7d32, #66bb6a)" }}
      >
        <div className="container">
          <h1 className="fw-bold mb-3">Disease Detection</h1>
          <p className="lead">
            Upload a leaf image to let our AI model identify potential crop
            diseases and suggest treatments.
          </p>
        </div>
      </section>

      {/* Upload Section */}
      <section className="py-5 bg-light text-center">
        <div className="container">
          <h3 className="text-success mb-3">Upload Leaf Image</h3>
          <p className="text-muted">
            Supported formats: JPG, PNG | Max size: 5MB
          </p>

          <div className="mb-4">
            <input
              type="file"
              accept="image/*"
              className="form-control w-50 mx-auto"
              onChange={handleImageChange}
            />
          </div>

          {preview && (
            <div className="mb-4">
              <img
                src={preview}
                alt="Preview"
                className="img-fluid rounded shadow-sm"
                style={{ maxHeight: "300px", borderRadius: "15px" }}
              />
            </div>
          )}

          {!loading ? (
            <>
              <button
                onClick={handlePredict}
                className="btn btn-success px-4 me-2"
              >
                Predict Disease
              </button>
              <button
                onClick={handleReset}
                className="btn btn-outline-secondary px-4"
              >
                Reset
              </button>
            </>
          ) : (
            <Loader />
          )}
        </div>
      </section>

      {/* Footer Section */}
      <section className="py-5 bg-success text-white text-center">
        <div className="container">
          <h4 className="fw-light">
            AI-powered precision detection for a healthier harvest 🌾
          </h4>
        </div>
      </section>
    </div>
  );
}
