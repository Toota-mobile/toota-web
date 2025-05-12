import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserPlus, FaSignInAlt, FaArrowLeft } from "react-icons/fa";
import Navbar from "./Navbar"; 

function DriverSignup() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/driver-dashboard");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col"
      style={{ backgroundImage: "url('images/bg.jpg')" }}
    >
    <Navbar/>
      {/* Main Section */}
      <div className="flex-grow flex flex-col justify-center items-center px-6 pt-32 pb-12">
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
            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="number">
                Enter Your Number
              </label>
              <input
                type="number"
                id="number"
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="plate">
                Enter your Number Plate
              </label>
              <input
                type="number plate"
                id="number plate"
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="model">
                Enter Your Truck Model
              </label>
              <input
                type="truck model"
                id="truck model"
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="color">
                Enter Your Truck color
              </label>
              <input
                type="truck color"
                id="truck color"
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
                required
              />
            </div>
   
            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">
                Create Password
              </label>
              <input
                type="truck color"
                id="truck color"
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
