// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { FaUserPlus, FaSignInAlt, FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black bg-opacity-80 text-white">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left Side: Logo, Title, Nav Links */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/Images/logo.png"
              alt="Toota Logo"
              className="w-14 h-14 cursor-pointer"
            />
            <h1 className="text-xl font-bold text-orange-500">Toota</h1>
          </Link>

          <div className="hidden sm:flex space-x-3 ml-4">
            <Link to="/" className="hover:text-orange-300">Home</Link>
            <Link to="/about" className="hover:text-orange-300">About</Link>
            <Link to="/services" className="hover:text-orange-300">Services</Link>
          </div>
        </div>

        {/* Right Side: Sign Up / Sign In Buttons */}
        <div className="hidden sm:flex space-x-2">
          <Link to="/signup" className="bg-white text-black px-3 py-2 rounded flex items-center gap-2 hover:bg-gray-200 text-sm">
            <FaUserPlus /> Sign Up
          </Link>
          <Link to="/signin" className="bg-orange-500 text-white px-3 py-2 rounded flex items-center gap-2 hover:bg-orange-600 text-sm">
            <FaSignInAlt /> Sign In
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="sm:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
            {isMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-black bg-opacity-90 px-4 pb-4 text-sm">
          <Link to="/" className="block py-2 hover:text-orange-300" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/about" className="block py-2 hover:text-orange-300" onClick={() => setIsMenuOpen(false)}>About</Link>
          <Link to="/services" className="block py-2 hover:text-orange-300" onClick={() => setIsMenuOpen(false)}>Services</Link>

          <div className="mt-3 space-y-2">
            <Link to="/signup" className="block bg-white text-black px-4 py-2 rounded hover:bg-gray-200 items-center gap-2" onClick={() => setIsMenuOpen(false)}>
              <FaUserPlus /> Sign Up
            </Link>
            <Link to="/signin" className="block bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 items-center gap-2" onClick={() => setIsMenuOpen(false)}>
              <FaSignInAlt /> Sign In
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
