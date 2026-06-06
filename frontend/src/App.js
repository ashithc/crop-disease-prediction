import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Detect from "./pages/Detect";
import Results from "./pages/Results";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import HowItWorks from "./pages/HowItWorks";
import Research from "./pages/Research";
import Blog from "./pages/Blog";


function App() {
  return (
    <>
      <Navbar />
      <ToastContainer position="top-center" theme="colored" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/detect" element={<Detect />} />
        <Route path="/result" element={<Results />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/how-it-works" element={<HowItWorks />} />
<Route path="/research" element={<Research />} />
<Route path="/blog" element={<Blog />} />


      </Routes>
      <Footer />
    </>
  );
}

export default App;
