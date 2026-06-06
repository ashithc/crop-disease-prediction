import React from "react";

const blogs = [
  {
    title: "How AI Helps Modern Farmers",
    image: "https://images.unsplash.com/photo-1581092795360-4a1c37e52c47?q=80&w=1200",
    date: "Nov 2025",
    summary: "Artificial Intelligence is revolutionizing agriculture by enabling early disease detection and crop monitoring."
  },
  {
    title: "Top 5 Crop Diseases in India",
    image: "https://images.unsplash.com/photo-1562564055-71e051d33c19?q=80&w=1200",
    date: "Oct 2025",
    summary: "From Rice Blast to Pepper Leaf Blight — here's a list of major crop diseases and how to prevent them."
  }
];

export default function Blog() {
  return (
    <div className="container py-5">
      <h2 className="text-success text-center mb-4">Latest Blogs</h2>
      <div className="row">
        {blogs.map((b, i) => (
          <div className="col-md-6 mb-4" key={i}>
            <div className="card shadow-sm h-100">
              <img src={b.image} className="card-img-top" alt={b.title} />
              <div className="card-body">
                <h5>{b.title}</h5>
                <p className="text-muted small">{b.date}</p>
                <p>{b.summary}</p>
                <button className="btn btn-outline-success btn-sm">Read More</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
