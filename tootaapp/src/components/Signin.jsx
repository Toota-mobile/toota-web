import React from "react";
import { Link } from "react-router-dom";
import { FaUserPlus, FaSignInAlt } from "react-icons/fa";

function Signin() {
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
          <Link to="/signup" className="bg-orange-500 text-white px-3 py-2 rounded flex items-center gap-2 hover:bg-orange-600 text-sm">
            <FaUserPlus /> Sign Up
          </Link>
          <button className="bg-white text-black px-3 py-2 rounded flex items-center gap-2 hover:bg-gray-300 text-sm">
            <FaSignInAlt /> Sign In
          </button>
        </div>
      </nav>

      {/* Main Section */}
      <div
        className="flex-grow flex flex-col justify-center items-center p-6 bg-cover bg-center"
        style={{ backgroundImage: "url('public/images/red.jpg')" }}
      >
        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-6 text-orange-500">Choose Sign In Type</h1>

          <div className="space-y-4">
            <Link 
              to="/signin/driver" 
              className="block w-64 text-center bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold"
            >
              Driver
            </Link>
            <Link 
              to="/signin/individual" 
              className="block w-64 text-center bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold"
            >
              Individual
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
