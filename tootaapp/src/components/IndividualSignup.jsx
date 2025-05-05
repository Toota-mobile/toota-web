import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserPlus, FaSignInAlt, FaArrowLeft } from "react-icons/fa";

const IndividualSignup = () => {
  const navigate = useNavigate(); // Initialize navigate for redirection

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate successful signup
    navigate("/profile"); // Redirect to profile page
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="navbar flex justify-between items-center p-4 bg-opacity-80 bg-black text-white">
        <div className="flex space-x-4 items-center">
          <img src="public/images/logo.png" alt="Toota Logo" className="w-14 h-14" />
          <h1 className="text-xl font-bold text-orange-500">Toota</h1>
          <div className="hidden sm:flex space-x-3">
            <Link to="/" className="hover:text-orange-300">Home</Link>
            <Link to="/about" className="hover:text-orange-300">About</Link>
            <Link to="/Services" className="hover:text-orange-300">Services</Link>
          </div>
        </div>

        <div className="flex space-x-2">
          <Link to="/signup" className="bg-white-500 text-black px-3 py-2 rounded flex items-center gap-2 hover:bg-gray-300 text-sm">
            <FaUserPlus /> Sign Up
          </Link>
          <button className="bg-orange-500 text-white px-3 py-2 rounded flex items-center gap-2 hover:bg-orange-600 text-sm">
            <FaSignInAlt /> Sign In
          </button>
        </div>
      </nav>

      {/* Main Section */}
      <div className="flex-grow flex flex-col justify-center items-center p-6 bg-cover bg-center" style={{ backgroundImage: "url('public/images/vcd.jpg')" }}>
        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-full max-w-md">
          {/* Back Button */}
          <div className="self-start mb-4">
            <Link to="/signup" className="flex items-center text-orange-500 font-semibold hover:underline text-sm">
              <FaArrowLeft className="mr-2" /> Back
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-center text-orange-500 mb-6">Individual Sign Up</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-gray-700 font-semibold mb-1">Full Name</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Enter your email"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-700 text-center">
            Already have an account?{" "}
            <Link to="/signin" className="text-orange-500 font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default IndividualSignup;
