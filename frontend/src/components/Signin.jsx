import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt, FaUserPlus, FaArrowLeft, FaTruck, FaUser } from "react-icons/fa";
import Navbar from "./Navbar";

function Signin() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* Main Section */}
      <main className="flex-grow flex flex-col justify-center items-center p-6">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
          {/* Back Button */}
          <button
            onClick={handleGoBack}
            className="flex items-center text-orange-500 hover:text-orange-600 font-medium mb-6 transition-colors"
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to access your account</p>
          </div>

          <div className="space-y-4 mb-8">
            {/* Driver Sign In */}
            <Link
              to="/signin/driver"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all group"
            >
              <div className="bg-orange-100 p-3 rounded-full mr-4 group-hover:bg-orange-200 transition">
                <FaTruck className="text-orange-500 text-xl" />
              </div>
              <div className="flex-grow text-left">
                <h3 className="font-semibold text-gray-800">Driver Sign In</h3>
                <p className="text-sm text-gray-500">Access driver dashboard</p>
              </div>
              <FaSignInAlt className="text-orange-500" />
            </Link>

            {/* User Sign In */}
            <Link
              to="/signin/individual"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all group"
            >
              <div className="bg-orange-100 p-3 rounded-full mr-4 group-hover:bg-orange-200 transition">
                <FaUser className="text-orange-500 text-xl" />
              </div>
              <div className="flex-grow text-left">
                <h3 className="font-semibold text-gray-800">User Sign In</h3>
                <p className="text-sm text-gray-500">Access customer account</p>
              </div>
              <FaSignInAlt className="text-orange-500" />
            </Link>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-white text-gray-400 text-sm">OR</span>
            </div>
          </div>

          {/* Sign Up Option */}
          <div className="text-center">
            <p className="text-gray-600 mb-4">New to Toota?</p>
            <Link
              to="/signup"
              className="inline-flex items-center justify-center px-6 py-3 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-lg font-medium transition-colors"
            >
              <FaUserPlus className="mr-2" /> Create Account
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm">
          <p>© {new Date().getFullYear()} Toota Delivery. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Signin;