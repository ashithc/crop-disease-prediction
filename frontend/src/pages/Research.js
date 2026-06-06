import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Research() {
  const data = {
    labels: ["Pepper", "Rice", "Tomato", "Sugarcane"],
    datasets: [
      {
        label: "Model Accuracy (%)",
        data: [96, 94, 95, 93],
      },
    ],
  };

  return (
    <div className="container py-5 text-center">
      <h2 className="text-success mb-4">Research & Dataset</h2>
      <p>
        The AI Crop Doctor model was trained on the <b>PlantVillage Dataset</b> with 50,000+ leaf images.
      </p>
      <div style={{ maxWidth: "600px", margin: "auto" }}>
        <Bar data={data} />
      </div>
      <p className="mt-3 text-muted">
        Evaluation metrics: Precision (95.2%), Recall (94.8%), F1-Score (95.0%)
      </p>
    </div>
  );
}
