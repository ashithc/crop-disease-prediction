import React from "react";

export default function HowItWorks() {
  return (
    <div className="container py-5 text-center">
      <h2 className="text-success mb-4">How It Works</h2>
      <div className="row">
        <div className="col-md-4">
          <img src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png" alt="Upload" width="80" />
          <h5 className="mt-3">1. Upload Leaf Image</h5>
          <p>Upload a clear photo of the affected leaf.</p>
        </div>
        <div className="col-md-4">
          <img src="https://cdn-icons-png.flaticon.com/512/4213/4213723.png" alt="AI" width="80" />
          <h5 className="mt-3">2. AI Analysis</h5>
          <p>The AI model analyzes your image using CNN algorithms.</p>
        </div>
        <div className="col-md-4">
          <img src="https://cdn-icons-png.flaticon.com/512/2910/2910768.png" alt="Result" width="80" />
          <h5 className="mt-3">3. Get Results</h5>
          <p>See disease name, treatment tips, and preventive care.</p>
        </div>
      </div>
      <div className="mt-5">
        <h4>AI Accuracy: 94.7%</h4>
        <p>Our model uses a trained CNN built on the PlantVillage dataset.</p>
      </div>
    </div>
  );
}
