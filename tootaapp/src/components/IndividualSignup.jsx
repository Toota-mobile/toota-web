import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserPlus, FaSignInAlt, FaArrowLeft } from "react-icons/fa";
import Navbar from "./Navbar"; 

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
      <Navbar />
     
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

            <div>
              <label htmlFor="number" className="block text-gray-700 font-semibold mb-1">Number</label>
              <input
                id="number"
                name="number"
                type="number"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Enter your number"
                required
              />
            </div>
            <div>
              <label htmlFor="number" className="block text-gray-700 font-semibold mb-1">Create Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Enter your password"
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