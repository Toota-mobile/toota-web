import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  FaUser, FaTruck, FaShippingFast, FaCar, FaMotorcycle, 
  FaTachometerAlt, FaMapMarkerAlt, FaImage, FaInfoCircle,
  FaArrowRight, FaStar, FaCheck, FaTimes, FaBox, FaMoneyBillWave, FaClock
} from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";

function UserDashboard() {
  const [activeTab, setActiveTab] = useState("newRequest"); // 'newRequest', 'active', 'history'
  const [selectedAction, setSelectedAction] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [packageDescription, setPackageDescription] = useState("");
  const [parcelImage, setParcelImage] = useState(null);
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deliveryType, setDeliveryType] = useState("standard");
  const [urgency, setUrgency] = useState("normal");

  // Sample data for active and completed requests
  const activeRequests = [
    {
      id: 1,
      type: "Parcel",
      pickup: "123 Business Park, Johannesburg",
      dropoff: "456 Corporate Center, Sandton",
      items: "1 envelope (A4 size)",
      distance: "2.5 km",
      price: "ZAR 120",
      timeEstimate: "15-20 mins",
      status: "Driver Assigned",
      driver: "John D.",
      driverRating: 4.7,
      vehicle: "Scooter"
    }
  ];

  const completedRequests = [
    {
      id: 2,
      type: "Furniture",
      pickup: "789 Residential Area, Pretoria",
      dropoff: "101 New Home, Centurion",
      items: "1 three-seater sofa",
      distance: "5.3 km",
      price: "ZAR 350",
      date: "2023-05-15",
      driver: "James R.",
      driverRating: 4.5,
      yourRating: 5,
      vehicle: "Bakkie"
    }
  ];

  const handleActionClick = (action) => {
    setSelectedAction(action);
    setVehicleType("");
    setPackageDescription("");
    setParcelImage(null);
    setPickupLocation("");
    setDropoffLocation("");
    setDeliveryType("standard");
    setUrgency("normal");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!vehicleType || !packageDescription || !pickupLocation || !dropoffLocation) {
      alert("Please complete all required fields.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert(`Request submitted successfully!
        Service: ${selectedAction === "sendParcel" ? "Parcel Delivery" : "Large Item Move"}
        Vehicle: ${vehicleType}
        Delivery Type: ${deliveryType}
        Urgency: ${urgency}`);
      
      // Reset form and switch to active tab
      handleActionClick("");
      setActiveTab("active");
    } catch (error) {
      alert("Error submitting request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const vehicleOptions = {
    sendParcel: [
      { value: "car", label: "Code 8 Car", icon: <FaCar /> },
      { value: "scooter", label: "Scooter", icon: <FaMotorcycle /> }
    ],
    moveLargeItems: [
      { value: "bakkie", label: "Bakkie", icon: <FaTruck /> },
      { value: "mediumTruck", label: "Medium Truck", icon: <MdLocalShipping /> },
      { value: "largeTruck", label: "Large Truck", icon: <FaShippingFast /> }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Dashboard Header */}
      <header className="bg-white shadow-sm p-4 fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src="public/images/logo.png" alt="Toota Logo" className="w-14 h-14" />
            <h1 className="text-xl font-bold text-orange-500">Toota</h1>
          </div>
          <div className="flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-orange-500 font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-gray-600 hover:text-orange-500 font-medium transition-colors"
            >
              About
            </Link>
            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
              User
            </span>
            <Link 
              to="/profile-page" 
              className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
            >
              <FaUser className="text-gray-600" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content with top padding */}
      <main className="container mx-auto p-4 pt-24">
        {/* Dashboard Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`py-3 px-6 font-medium flex items-center ${activeTab === 'newRequest' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('newRequest')}
          >
            New Request
          </button>
          <button
            className={`py-3 px-6 font-medium flex items-center ${activeTab === 'active' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('active')}
          >
            Active Deliveries
            <span className="ml-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
              {activeRequests.length}
            </span>
          </button>
          <button
            className={`py-3 px-6 font-medium flex items-center ${activeTab === 'history' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('history')}
          >
            History
            <span className="ml-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
              {completedRequests.length}
            </span>
          </button>
        </div>

        {/* Dashboard Content */}
        {activeTab === "newRequest" && (
          <div className="bg-white rounded-xl shadow-md p-6">
            {!selectedAction ? (
              <div className="text-center py-12">
                <div className="bg-orange-100 p-6 rounded-full inline-block mb-6">
                  <FaTachometerAlt className="text-5xl text-orange-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Create New Delivery Request</h2>
                <p className="text-gray-600 max-w-md mx-auto mb-8">
                  Choose the type of delivery you need to get started
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-lg mx-auto">
                  <button 
                    onClick={() => handleActionClick("sendParcel")} 
                    className="bg-white border-2 border-orange-500 rounded-xl p-6 flex flex-col items-center hover:bg-orange-50 transition-colors"
                  >
                    <div className="bg-orange-100 p-4 rounded-full mb-4">
                      <FaTruck className="text-3xl text-orange-500" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Send Parcel</h3>
                    <p className="text-gray-600 text-sm">Small packages, documents, and regular items</p>
                  </button>
                  
                  <button 
                    onClick={() => handleActionClick("moveLargeItems")} 
                    className="bg-white border-2 border-orange-500 rounded-xl p-6 flex flex-col items-center hover:bg-orange-50 transition-colors"
                  >
                    <div className="bg-orange-100 p-4 rounded-full mb-4">
                      <FaShippingFast className="text-3xl text-orange-500" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Move Large Items</h3>
                    <p className="text-gray-600 text-sm">Furniture, appliances, and bulky items</p>
                  </button>
                </div>
              </div>
            ) : (
              <div className="max-w-2xl mx-auto">
                <button 
                  onClick={() => setSelectedAction("")} 
                  className="flex items-center text-orange-500 mb-6 hover:underline"
                >
                  ← Back to request types
                </button>
                
                <h2 className="text-2xl font-bold text-orange-500 mb-2 flex items-center gap-2">
                  {selectedAction === "sendParcel" ? (
                    <><FaTruck /> Send Parcel</>
                  ) : (
                    <><FaShippingFast /> Move Large Items</>
                  )}
                </h2>
                <p className="text-gray-600 mb-6">Fill in the details below to request a delivery</p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Delivery Type */}
                  <div>
                    <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-2">
                      Delivery Type
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setDeliveryType("standard")}
                        className={`p-3 border rounded-lg flex flex-col items-center ${deliveryType === "standard" ? "border-orange-500 bg-orange-50" : "border-gray-300 hover:bg-gray-50"}`}
                      >
                        <span className="font-medium">Standard</span>
                        <span className="text-xs text-gray-500">2-4 hours</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeliveryType("express")}
                        className={`p-3 border rounded-lg flex flex-col items-center ${deliveryType === "express" ? "border-orange-500 bg-orange-50" : "border-gray-300 hover:bg-gray-50"}`}
                      >
                        <span className="font-medium">Express</span>
                        <span className="text-xs text-gray-500">1 hour or less</span>
                      </button>
                    </div>
                  </div>

                  {/* Vehicle Selection */}
                  <div>
                    <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-2">
                      Select Vehicle
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {vehicleOptions[selectedAction].map((option) => (
                        <div
                          key={option.value}
                          onClick={() => setVehicleType(option.value)}
                          className={`flex flex-col items-center p-4 border rounded-lg cursor-pointer transition-colors ${vehicleType === option.value ? "border-orange-500 bg-orange-50" : "border-gray-300 hover:bg-gray-50"}`}
                        >
                          <div className="text-orange-500 mb-2">{option.icon}</div>
                          <span className="text-sm font-medium">{option.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Package Description */}
                  <div>
                    <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-2">
                      <FaInfoCircle /> {selectedAction === "sendParcel" ? "Package Description" : "Items Description"}
                    </label>
                    <textarea
                      value={packageDescription}
                      onChange={(e) => setPackageDescription(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                      placeholder={selectedAction === "sendParcel" ? "Describe your package contents, dimensions, and weight..." : "Describe the items including dimensions, weight, and any special handling requirements..."}
                      rows={4}
                      required
                    />
                  </div>

                  {/* Location Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-2">
                        <FaMapMarkerAlt /> Pick-up Location
                      </label>
                      <input
                        type="text"
                        value={pickupLocation}
                        onChange={(e) => setPickupLocation(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                        placeholder="Enter exact address"
                        required
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-2">
                        <FaMapMarkerAlt /> Drop-off Location
                      </label>
                      <input
                        type="text"
                        value={dropoffLocation}
                        onChange={(e) => setDropoffLocation(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                        placeholder="Enter exact address"
                        required
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors disabled:bg-orange-400 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      "Submit Request"
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        {activeTab === "active" && (
          <div className="space-y-6">
            {activeRequests.length > 0 ? (
              activeRequests.map((request) => (
                <div key={request.id} className="bg-white rounded-lg shadow-md p-5 border border-gray-200">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg mb-1">Delivery #{request.id}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        request.status === "Driver Assigned" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                      }`}>
                        {request.status}
                      </span>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <span className="text-gray-500 text-sm flex items-center">
                        <FaMapMarkerAlt className="mr-1" /> {request.distance}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                        <FaBox className="text-orange-500 mr-2" /> Items
                      </h4>
                      <p className="text-gray-600">{request.items}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                        <FaMapMarkerAlt className="text-orange-500 mr-2" /> Pickup
                      </h4>
                      <p className="text-gray-600">{request.pickup}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                        <FaArrowRight className="text-orange-500 mr-2" /> Dropoff
                      </h4>
                      <p className="text-gray-600">{request.dropoff}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                        <FaMoneyBillWave className="text-orange-500 mr-2" /> Price
                      </h4>
                      <p className="text-gray-600 font-bold">{request.price}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                        <FaClock className="text-orange-500 mr-2" /> Time Estimate
                      </h4>
                      <p className="text-gray-600">{request.timeEstimate}</p>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="font-medium text-gray-700 mb-2">Driver Information</h4>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        <span className="text-gray-600">{request.driver.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-medium">{request.driver}</p>
                        <div className="flex items-center">
                          <FaStar className="text-yellow-500 mr-1" />
                          <span className="text-sm text-gray-600">{request.driverRating}</span>
                          <span className="mx-2 text-gray-300">•</span>
                          <span className="text-sm text-gray-600">{request.vehicle}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mt-6">
                    <button className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 flex-1">
                      Track Delivery
                    </button>
                    <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300 flex-1">
                      Contact Driver
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <h3 className="text-xl font-medium text-gray-700 mb-4">No Active Deliveries</h3>
                <p className="text-gray-500 mb-6">You don't have any active deliveries right now.</p>
                <button 
                  onClick={() => setActiveTab("newRequest")}
                  className="bg-orange-500 text-white py-2 px-6 rounded hover:bg-orange-600"
                >
                  Create New Request
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === "history" && (
          <div className="space-y-6">
            {completedRequests.length > 0 ? (
              completedRequests.map((request) => (
                <div key={request.id} className="bg-white rounded-lg shadow-md p-5 border border-gray-200">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg mb-1">Delivery #{request.id}</h3>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Completed
                      </span>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <span className="text-gray-500 text-sm">{request.date}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                        <FaBox className="text-orange-500 mr-2" /> Items
                      </h4>
                      <p className="text-gray-600">{request.items}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                        <FaMapMarkerAlt className="text-orange-500 mr-2" /> Pickup
                      </h4>
                      <p className="text-gray-600">{request.pickup}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                        <FaArrowRight className="text-orange-500 mr-2" /> Dropoff
                      </h4>
                      <p className="text-gray-600">{request.dropoff}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                        <FaMoneyBillWave className="text-orange-500 mr-2" /> Price
                      </h4>
                      <p className="text-gray-600 font-bold">{request.price}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                        <FaClock className="text-orange-500 mr-2" /> Distance
                      </h4>
                      <p className="text-gray-600">{request.distance}</p>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="font-medium text-gray-700 mb-2">Driver Information</h4>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                          <span className="text-gray-600">{request.driver.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-medium">{request.driver}</p>
                          <div className="flex items-center">
                            <FaStar className="text-yellow-500 mr-1" />
                            <span className="text-sm text-gray-600">{request.driverRating}</span>
                            <span className="mx-2 text-gray-300">•</span>
                            <span className="text-sm text-gray-600">{request.vehicle}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600 mb-1">Your rating:</p>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className={i < request.yourRating ? "text-yellow-500" : "text-gray-300"} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <button className="mt-4 text-orange-500 hover:underline text-sm">
                    Request Again
                  </button>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <h3 className="text-xl font-medium text-gray-700 mb-4">Delivery History</h3>
                <p className="text-gray-500 mb-6">You haven't completed any deliveries yet.</p>
                <button 
                  onClick={() => setActiveTab("newRequest")}
                  className="bg-orange-500 text-white py-2 px-6 rounded hover:bg-orange-600"
                >
                  Create New Request
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Bottom Navigation (for mobile) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-40">
        <div className="flex justify-around">
          <button
            onClick={() => setActiveTab("newRequest")}
            className={`py-3 px-4 flex flex-col items-center ${activeTab === 'newRequest' ? 'text-orange-500' : 'text-gray-500'}`}
          >
            <FaTruck />
            <span className="text-xs mt-1">New</span>
          </button>
          <button
            onClick={() => setActiveTab("active")}
            className={`py-3 px-4 flex flex-col items-center ${activeTab === 'active' ? 'text-orange-500' : 'text-gray-500'}`}
          >
            <FaShippingFast />
            <span className="text-xs mt-1">Active</span>
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`py-3 px-4 flex flex-col items-center ${activeTab === 'history' ? 'text-orange-500' : 'text-gray-500'}`}
          >
            <FaCheck />
            <span className="text-xs mt-1">History</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;