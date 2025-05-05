import React, { useState } from "react";
import Services from "./Services";
import { Link } from "react-router-dom";
import { FaUserPlus, FaSignInAlt, FaSearchLocation } from "react-icons/fa"; // Ensure FaUserPlus is included


function LandingPage() {
  const [trackingNumber, setTrackingNumber] = useState("");

  const handleSearch = () => {
    alert(`Searching for: ${trackingNumber}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="navbar flex justify-between items-center p-4 bg-opacity-80 bg-black text-white">
        <div className="flex space-x-4 items-center">
          {/* Logo & Title */}
          <img src="public/images/logo.png" alt="Toota Logo" className="w-12 h-12" />
          <h1 className="text-xl font-bold text-orange-500">Toota</h1>

          {/* Navigation Links */}
          <div className="hidden sm:flex space-x-3">
          <Link to="/" className="hover:text-orange-300">Home</Link>
          <Link to="/about" className="hover:text-orange-300">About</Link>
         <Link to="/Services" className="hover:text-orange-300">Services</Link>
         </div>
        </div>

        {/* Sign In / Sign Up Buttons */}
        <div className="flex space-x-2">
          <Link to="/signup" className="bg-white-500 text-black px-3 py-2 rounded flex items-center gap-2 hover:bg-gray-300 text-sm">
            <FaUserPlus /> Sign Up
          </Link>

          <Link
              to="/signin"
              className="bg-orange-500 text-white px-3 py-2 rounded flex items-center gap-2 hover:bg-orange-600 text-sm"
          >
          <FaSignInAlt /> Sign In
          </Link>
        </div>
      </nav>
{/* Hero Section */}
<div className="truck-background flex flex-col justify-center items-center flex-grow text-white text-center p-10 relative">
  <h1 className="text-4xl md:text-5xl font-bold text-black bg-orange-500 p-2 rounded-md">Toota</h1>
  <p className="mt-4 text-lg max-w-md">Your deliveries. Our priority.</p>

  {/* Search Box for Tracking */}
  <div className="mt-6 flex bg-white rounded-lg shadow-md overflow-hidden max-w-xs w-full">
    <span className="p-3 text-black">
      <FaSearchLocation size={20} />
    </span>
    <input
      type="text"
      placeholder="Track Your Delivery..."
      className="w-full p-3 text-black outline-none text-sm"
      value={trackingNumber}
      onChange={(e) => setTrackingNumber(e.target.value)}
    />
    <button
      onClick={handleSearch}
      className="bg-black text-orange-500 px-6 py-3 hover:bg-gray-800 flex items-center gap-2 text-sm"
    >
      <FaSearchLocation />
      Track
    </button>
  </div>

  {/* Delivery Selection Right Below Tracking */}
  <div className="delivery-selection mt-6 p-6 rounded-lg shadow-lg bg-opacity-60 bg-black text-white w-full max-w-lg">
    <h2 className="text-center text-3xl font-bold mb-4">What do you want to deliver?</h2>

    <div className="delivery-options grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Small Parcel */}
      <div className="option text-center">
        <img src="public/images/close-up-delivery.jpg" alt="Small Parcel" className="option-img w-40 mx-auto"/>
        <p className="text-lg font-semibold mt-2">Move Small Parcel</p>
      </div>

      {/* Goods/Furniture */}
      <div className="option text-center">
        <img src="public/images/black-female-courier.jpg" alt="Furniture Delivery" className="option-img w-40 mx-auto"/>
        <p className="text-lg font-semibold mt-2">Move Goods/Furniture</p>
      </div>
      </div>
      </div>
    </div>

      {/* Services Section - Added Below Home Content */}
      <Services />
    </div>
  );
}

export default LandingPage;
