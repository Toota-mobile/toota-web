import React, { useState } from "react";
import Services from "./Services";
import { FaSearchLocation, FaTruck, FaBoxOpen, FaShieldAlt } from "react-icons/fa";
import Navbar from "./Navbar";

function LandingPage() {
  const [trackingNumber, setTrackingNumber] = useState("");

  const handleSearch = () => {
    alert(`Searching for: ${trackingNumber}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-500 to-black text-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Fast & Reliable Delivery Services</h1>
            <p className="text-xl mb-8">Your packages delivered with care, on time, every time.</p>
            
            {/* Search Box */}
            <div className="flex flex-col sm:flex-row bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-md">
              <div className="flex items-center p-3 text-gray-500">
                <FaSearchLocation size={20} />
              </div>
              <input
                type="text"
                placeholder="Enter tracking number..."
                className="flex-grow p-3 text-gray-800 outline-none"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
              />
              <button
                onClick={handleSearch}
                className="bg-black text-orange-500 px-6 py-3 hover:bg-gray-800 font-medium"
              >
                Track
              </button>
            </div>
          </div>
          
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-orange-500 rounded-full opacity-20"></div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-black rounded-full opacity-20"></div>
              <img 
                src="/Images/Realistic truck.png" 
                alt="Delivery Truck" 
                className="relative z-10 w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Delivery Service?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-orange-500 mb-4">
                <FaTruck className="text-4xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">We guarantee timely delivery with our optimized routes and fleet.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-orange-500 mb-4">
                <FaBoxOpen className="text-4xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Package Variety</h3>
              <p className="text-gray-600">From small parcels to large furniture, we handle it all with care.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-orange-500 mb-4">
                <FaShieldAlt className="text-4xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Handling</h3>
              <p className="text-gray-600">Your items are protected with our secure packaging and handling.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Options */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Would You Like To Deliver?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Small Parcel */}
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center">
              <div className="md:w-1/3 mb-4 md:mb-0">
                <img 
                  src="/Images/close-up-delivery.jpg" 
                  alt="Small Parcel" 
                  className="w-full h-auto rounded-md"
                />
              </div>
              <div className="md:w-2/3 md:pl-6">
                <h3 className="text-xl font-semibold mb-2">Small Parcels</h3>
                <p className="text-gray-600 mb-4">Perfect for documents, small packages, and everyday items.</p>
                <button className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition">
                  Schedule Pickup
                </button>
              </div>
            </div>
            
            {/* Furniture/Goods */}
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center">
              <div className="md:w-1/3 mb-4 md:mb-0">
                <img 
                  src="/Images/black-female-courier.jpg" 
                  alt="Furniture Delivery" 
                  className="w-full h-auto rounded-md"
                />
              </div>
              <div className="md:w-2/3 md:pl-6">
                <h3 className="text-xl font-semibold mb-2">Furniture & Goods</h3>
                <p className="text-gray-600 mb-4">Specialized handling for large items and furniture.</p>
                <button className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition">
                  Request Delivery
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <Services />
      </div>
    </div>
  );
}

export default LandingPage;