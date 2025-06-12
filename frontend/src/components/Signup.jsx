import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserPlus, FaSignInAlt, FaArrowLeft } from "react-icons/fa";
import Navbar from "./Navbar";

function Signup() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col"
      style={{ backgroundImage: "url('/images/G.jpg')" }}
    >
      <Navbar />

      {/* Main Section */}
      <main className="flex-grow flex flex-col justify-center items-center p-6 pt-32">
        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-full max-w-md">
          {/* Back Button */}
          <div className="self-start mb-4">
            <button
              onClick={handleGoBack}
              className="flex items-center text-orange-500 font-semibold hover:underline text-sm"
            >
              <FaArrowLeft className="mr-2" /> Back
            </button>
          </div>

          <h1 className="text-3xl font-bold mb-6 text-orange-500 text-center">
            Choose Sign Up Type
          </h1>

          <div className="flex flex-col items-center space-y-4 mb-6">
            <Link
              to="/signup/driver"
              className="w-full max-w-xs flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold gap-2 transition-colors"
            >
              <FaUserPlus /> Driver Sign Up
            </Link>
            <Link
              to="/signup/individual"
              className="w-full max-w-xs flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold gap-2 transition-colors"
            >
              <FaUserPlus /> User Sign Up
            </Link>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 bg-white bg-opacity-80 text-gray-500 text-sm">
                OR
              </span>
            </div>
          </div>

          {/* Sign In Option */}
          <div className="text-center">
            <p className="text-gray-700 mb-4">Already have an account?</p>
            <Link
              to="/signin"
              className="w-full max-w-xs mx-auto flex items-center justify-center border-2 border-orange-500 text-orange-500 hover:bg-orange-50 py-3 rounded-lg font-semibold gap-2 transition-colors"
            >
              <FaSignInAlt /> Sign In
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Signup;