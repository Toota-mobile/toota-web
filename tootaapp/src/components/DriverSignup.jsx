import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserPlus, FaSignInAlt, FaArrowLeft } from "react-icons/fa";

function DriverSignup() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate successful signup
    navigate("/driver-dashboard"); // ✅ Fixed
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
      <div
        className="flex-grow flex flex-col justify-center items-center p-6 bg-cover bg-center"
        style={{ backgroundImage: "url('public/images/bg.jpg')" }} // ✅ Fixed
      >
        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg flex flex-col items-center w-full max-w-md">
          <div className="self-start mb-4">
            <Link to="/signup" className="flex items-center text-orange-500 font-semibold hover:underline text-sm">
              <FaArrowLeft className="mr-2" /> Back
            </Link>
          </div>

          <h1 className="text-3xl font-bold text-orange-500 mb-6 text-center">Driver Signup</h1>

          <form className="w-full space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
                Enter Your Full Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
                Enter Your Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-lg"
            >
              Sign Up as Driver
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-700">
            Already have an account?{" "}
            <Link to="/signin" className="text-orange-500 font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default DriverSignup;
