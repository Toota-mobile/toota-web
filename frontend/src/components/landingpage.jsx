import React, { useState } from "react";
import Services from "./Services";
import { Link } from "react-router-dom";
import {
  FaUserPlus,
  FaSignInAlt,
  FaSearchLocation,
  FaBars,
} from "react-icons/fa";
import Navbar from "./Navbar"; 

function LandingPage() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = () => {
    alert(`Searching for: ${trackingNumber}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar/>

      {/* Hero Section with Realistic Truck Background */}
      <div 
        className="truck-background min-h-screen pt-24 flex flex-col justify-center items-center text-white text-center px-6 sm:px-10 relative"
        style={{ backgroundImage: "url('/Images/Realistic truck.png')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black bg-orange-500 px-4 py-2 rounded-md">
          Toota
        </h1>
        <p className="mt-4 text-base sm:text-lg max-w-md">Your deliveries. Our priority.</p>

        {/* Search Box */}
        <div className="mt-6 flex flex-col sm:flex-row bg-white rounded-lg shadow-md overflow-hidden w-full max-w-sm sm:max-w-md">
          <span className="p-3 text-black flex items-center justify-center">
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
            className="bg-black text-orange-500 px-6 py-3 hover:bg-gray-800 flex items-center gap-2 text-sm justify-center"
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
              <img src="/Images/close-up-delivery.jpg" alt="Small Parcel" className="option-img w-40 mx-auto"/>
              <p className="text-lg font-semibold mt-2">Move Small Parcel</p>
            </div>
            {/* Goods/Furniture */}
            <div className="option text-center">
              <img src="/Images/black-female-courier.jpg" alt="Furniture Delivery" className="option-img w-40 mx-auto"/>
              <p className="text-lg font-semibold mt-2">Move Goods/Furniture</p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="p-4 sm:p-6 text-center bg-white">
        <Services />
      </div>
    </div>
  );
}

export default LandingPage;

