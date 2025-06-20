import React, { useState } from "react";
import { FaArrowRight, FaStar, FaCheck, FaTimes, FaMapMarkerAlt, FaBox, FaMoneyBillWave, FaClock } from "react-icons/fa";
import { Link } from 'react-router-dom';

const DriverDashboard = () => {
  const [activeTab, setActiveTab] = useState("current"); // 'current', 'active', 'completed', 'history'
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Sample requests data
  const activeRequests = [  // Renamed from availableRequests
    {
      id: 1,
      type: "Parcel",
      pickup: "123 Business Park, Johannesburg",
      dropoff: "456 Corporate Center, Sandton",
      items: "1 envelope (A4 size)",
      distance: "2.5 km",
      price: "ZAR 120",
      timeEstimate: "15-20 mins",
      specialInstructions: "Fragile - Handle with care",
      customerRating: 4.8,
      customerName: "Brant Watson"
    },
    {
      id: 2,
      type: "Furniture",
      pickup: "789 Residential Area, Pretoria",
      dropoff: "101 New Home, Centurion",
      items: "1 three-seater sofa",
      distance: "5.3 km",
      price: "ZAR 350",
      timeEstimate: "30-45 mins",
      specialInstructions: "Need help carrying to 3rd floor",
      customerRating: 4.5,
      customerName: "Luyanda Dweli"
    },
    {
      id: 3,
      type: "Multiple Items",
      pickup: "55 Shopping Mall, Auckland",
      dropoff: "22 Office Park, Midrand",
      items: "3 boxes of documents + 1 monitor",
      distance: "8.1 km",
      price: "ZAR 220",
      timeEstimate: "25-35 mins",
      specialInstructions: "Urgent delivery needed before 2pm",
      customerRating: 4.9,
      customerName: "Karabo Matlabe"
    }
  ];

  const currentRequests = [
    {
      id: 4,
      type: "Food Delivery",
      pickup: "Burger Joint, Menlyn",
      dropoff: "12 Apartment Complex, Hatfield",
      items: "2 meals + drinks",
      distance: "3.2 km",
      price: "ZAR 85",
      timeEstimate: "10-15 mins",
      status: "In Progress",
      progress: "On the way to pickup"
    }
  ];

  const completedRequests = [
    {
      id: 5,
      type: "Parcel",
      pickup: "Office Supplies Inc, Pretoria",
      dropoff: "Tech Startup Hub, Sandton",
      items: "2 packages",
      distance: "12.5 km",
      price: "ZAR 180",
      timeTaken: "35 mins",
      date: "2023-05-15",
      customerRating: 5.0,
      customerName: "Thando Mbeki"
    }
  ];

  const handleAcceptRequest = (requestId) => {
    alert(`Request #${requestId} accepted!`);
    setActiveTab("current");
  };

  const handleCompleteRequest = (requestId) => {
    alert(`Request #${requestId} marked as completed!`);
    setActiveTab("completed");
  };

  const handleRejectRequest = (requestId) => {
    alert(`Request #${requestId} rejected`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Dashboard Header */}
      <header className="bg-white shadow-sm p-4 fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img 
              src="/images/logo.png" 
              alt="Company Logo"
              className="h-14 w-14 object-contain"
            />
            <h1 className="text-2xl font-bold text-orange-500">Driver Dashboard</h1>
          </div>
          <nav className="flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-orange-500 font-medium">
              Home
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-orange-500 font-medium">
              About
            </Link>
            <Link to="/driver-profile">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300">
                <span className="text-gray-600">JD</span>
              </div>
            </Link>
          </nav>
        </div>
      </header>
      
      {/* Main Content with top padding */}
      <main className="container mx-auto p-4 pt-24">
        {/* Dashboard Tabs - Updated labels */}
        <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
          <button
            className={`py-3 px-6 font-medium flex items-center whitespace-nowrap ${activeTab === 'current' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('current')}
          >
            Current Request
            <span className="ml-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
              {currentRequests.length}
            </span>
          </button>
          <button
            className={`py-3 px-6 font-medium flex items-center whitespace-nowrap ${activeTab === 'active' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('active')}
          >
            Active Requests
            <span className="ml-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
              {activeRequests.length}
            </span>
          </button>
          <button
            className={`py-3 px-6 font-medium whitespace-nowrap ${activeTab === 'completed' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('completed')}
          >
            Completed Requests
            <span className="ml-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
              {completedRequests.length}
            </span>
          </button>
          <button
            className={`py-3 px-6 font-medium whitespace-nowrap ${activeTab === 'history' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('history')}
          >
            History
          </button>
        </div>

        {/* Dashboard Content */}
        {activeTab === "current" && (
          <div className="space-y-6">
            {currentRequests.length > 0 ? (
              currentRequests.map((request) => (
                <div key={request.id} className="bg-white rounded-lg shadow-md p-5 border border-gray-200">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg mb-1">Delivery #{request.id}</h3>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          request.status === "In Progress" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                        }`}>
                          {request.status}
                        </span>
                        <span className="text-sm text-gray-600">{request.progress}</span>
                      </div>
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
                        <FaMoneyBillWave className="text-orange-500 mr-2" /> Earnings
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

                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                    <button className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 flex-1">
                      Update Status
                    </button>
                    <button 
                      onClick={() => handleCompleteRequest(request.id)}
                      className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 flex-1"
                    >
                      Mark as Completed
                    </button>
                    <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300 flex-1">
                      Contact Customer
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <h3 className="text-xl font-medium text-gray-700 mb-4">No Current Deliveries</h3>
                <p className="text-gray-500 mb-6">You don't have any active deliveries at the moment.</p>
                <button 
                  onClick={() => setActiveTab("active")}
                  className="bg-orange-500 text-white py-2 px-6 rounded hover:bg-orange-600"
                >
                  View Active Requests
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === "active" && (  // Changed from "available" to "active"
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeRequests.map((request) => (
              <div key={request.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      request.type === "Parcel" ? "bg-blue-100 text-blue-800" :
                      request.type === "Furniture" ? "bg-purple-100 text-purple-800" :
                      "bg-green-100 text-green-800"
                    }`}>
                      {request.type}
                    </span>
                    <span className="text-gray-500 text-sm flex items-center">
                      <FaMapMarkerAlt className="mr-1" /> {request.distance}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg mb-2">{request.customerName}</h3>
                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < Math.floor(request.customerRating) ? "text-orange-500" : "text-gray-300"} />
                    ))}
                    <span className="text-gray-500 text-sm ml-1">{request.customerRating}</span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-start">
                      <FaBox className="text-orange-500 mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-700">Items:</p>
                        <p className="text-gray-600">{request.items}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <FaMapMarkerAlt className="text-orange-500 mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-700">Pickup:</p>
                        <p className="text-gray-600">{request.pickup}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <FaArrowRight className="text-orange-500 mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-700">Dropoff:</p>
                        <p className="text-gray-600">{request.dropoff}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <FaMoneyBillWave className="text-orange-500 mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-700">Earnings:</p>
                        <p className="text-gray-600 font-bold">{request.price}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <FaClock className="text-orange-500 mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-700">Time Estimate:</p>
                        <p className="text-gray-600">{request.timeEstimate}</p>
                      </div>
                    </div>
                  </div>

                  {request.specialInstructions && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4">
                      <p className="text-yellow-700 text-sm">{request.specialInstructions}</p>
                    </div>
                  )}

                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleAcceptRequest(request.id)}
                      className="flex-1 bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 flex items-center justify-center"
                    >
                      <FaCheck className="mr-2" /> Accept
                    </button>
                    <button
                      onClick={() => handleRejectRequest(request.id)}
                      className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300 flex items-center justify-center"
                    >
                      <FaTimes className="mr-2" /> Decline
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "completed" && (
          <div className="space-y-6">
            {completedRequests.length > 0 ? (
              completedRequests.map((request) => (
                <div key={request.id} className="bg-white rounded-lg shadow-md p-5 border border-gray-200">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg mb-1">Delivery #{request.id}</h3>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Completed
                        </span>
                        <span className="text-sm text-gray-600">{request.date}</span>
                      </div>
                    </div>
                    <div className="mt-2 md:mt-0 flex items-center">
                      <span className="text-gray-500 text-sm flex items-center mr-4">
                        <FaMapMarkerAlt className="mr-1" /> {request.distance}
                      </span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={i < Math.floor(request.customerRating) ? "text-orange-500" : "text-gray-300"} />
                        ))}
                      </div>
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
                        <FaMoneyBillWave className="text-orange-500 mr-2" /> Earnings
                      </h4>
                      <p className="text-gray-600 font-bold">{request.price}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                        <FaClock className="text-orange-500 mr-2" /> Time Taken
                      </h4>
                      <p className="text-gray-600">{request.timeTaken}</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border-l-4 border-blue-400 p-3 mb-4">
                    <p className="text-blue-700 text-sm">Customer rating: {request.customerRating}/5</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <h3 className="text-xl font-medium text-gray-700 mb-4">No Completed Requests</h3>
                <p className="text-gray-500 mb-6">You haven't completed any requests yet.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "history" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-medium text-gray-700 mb-6">Delivery History</h3>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Delivery ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Earnings
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rating
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {completedRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{request.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {request.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {request.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-bold">
                        {request.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className={i < Math.floor(request.customerRating) ? "text-orange-500" : "text-gray-300"} size={14} />
                          ))}
                          <span className="ml-1">{request.customerRating}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {completedRequests.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No delivery history available</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Bottom Navigation (for mobile) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-40">
        <div className="flex justify-around">
          <button
            onClick={() => setActiveTab("current")}
            className={`py-3 px-4 flex flex-col items-center ${activeTab === 'current' ? 'text-orange-500' : 'text-gray-500'}`}
          >
            <FaCheck />
            <span className="text-xs mt-1">Current</span>
          </button>
          <button
            onClick={() => setActiveTab("active")}
            className={`py-3 px-4 flex flex-col items-center ${activeTab === 'active' ? 'text-orange-500' : 'text-gray-500'}`}
          >
            <FaBox />
            <span className="text-xs mt-1">Active</span>
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`py-3 px-4 flex flex-col items-center ${activeTab === 'completed' ? 'text-orange-500' : 'text-gray-500'}`}
          >
            <FaCheck />
            <span className="text-xs mt-1">Completed</span>
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`py-3 px-4 flex flex-col items-center ${activeTab === 'history' ? 'text-orange-500' : 'text-gray-500'}`}
          >
            <FaStar />
            <span className="text-xs mt-1">History</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;