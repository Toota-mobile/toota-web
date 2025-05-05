// src/components/DriverSignin.jsx
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "./Navbar"; // Adjust the path as necessary

function DriverSignin() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate successful login
    navigate("/driver-dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div
        className="flex-grow flex flex-col items-center justify-center bg-cover bg-center px-4"
        style={{ backgroundImage: "url('public/images/cool.jpg')" }}
      >
        <div className="bg-white bg-opacity-80 p-6 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-orange-500 mb-4 text-center">Driver Sign In</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded"
            >
              Sign In
            </button>
          </form>
          <p className="mt-4 text-sm text-center">
            Don't have an account?{" "}
            <Link to="/signup/driver" className="text-orange-500">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default DriverSignin;
