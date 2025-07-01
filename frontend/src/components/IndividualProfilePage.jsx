import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  FaUser, FaTruck, FaShippingFast, FaCar, FaMotorcycle,
  FaTachometerAlt, FaMapMarkerAlt, FaImage, FaInfoCircle,
  FaArrowRight, FaStar, FaCheck, FaTimes, FaBox, FaMoneyBillWave, 
  FaClock, FaExclamationTriangle, FaHome, FaBell, FaQuestionCircle
} from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import md5 from "md5";

function UserDashboard() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
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
  const socketObj = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const tab = searchParams.get("tab") || "default";

  const token = localStorage.getItem("authToken");
  const retryTimeoutRef = useRef(null);
  const email = localStorage.getItem("email");
  const hash = email?.trim().toLowerCase()
    ? md5(email.trim().toLowerCase()).toString()
    : "";
  const gravatarUrl = `https://www.gravatar.com/avatar/${hash}?d=404&s=40`;
  const [imgError, setImgError] = useState(false);

  useEffect(() => setImgError(false), [email]);
  useEffect(() => {
    setActiveTab(tab);
  }, [tab]);

  useEffect(() => {
    if (!token) {
      navigate("/signin/individual");
      return;
    }

    let socket;
    let attempt = 0;
    const maxDelay = 30000;

    const connectWebSocket = () => {
      socket = new WebSocket(`wss://toota-web.onrender.com/ws/trips/user/?token=${token}`);
      socketObj.current = socket;

      socket.onopen = () => {
        setIsConnected(true);
        attempt = 0;
      };

      socket.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        switch (msg.type) {
          case "trip_created":
            localStorage.setItem("tripId", msg.trip_id || "");
            const tripId = localStorage.getItem("tripId");
            setShowSuccessNotification(true);
            setTimeout(() => {
              setVehicleType("");
              setPackageDescription("");
              setParcelImage(null);
              setPickupLocation("");
              setDropoffLocation("");
              setDeliveryType("standard");
              setUrgency("normal");
              navigate("/payment", {
                state: {
                  tripData: msg,
                }
              });
              setTimeout(() => {
                setShowSuccessNotification(false);
              }, 3000);
            }, 2000);
            break;
          case "error":
            break;
          default:
            break;
        }
      }

      socket.onerror = (error) => {
        setIsConnected(false);
      };

      socket.onclose = () => {
        setIsConnected(false);
        attempt++;
        const delay = Math.min(1000 * 2 ** attempt, maxDelay);
        retryTimeoutRef.current = setTimeout(connectWebSocket, delay);
      };
    };

    connectWebSocket();

    return () => {
      if (socketObj.current) socketObj.current.close();
      clearTimeout(retryTimeoutRef.current);
    };
  }, [token, navigate]);

  const WelcomeMessage = ({ userEmail }) => {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold text-gray-800">Welcome back, {userEmail?.split('@')[0] || 'User'}!</h2>
            <p className="text-gray-600">What would you like to do today?</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Link 
              to="/" 
              className="bg-gray-50 hover:bg-gray-100 p-3 rounded-lg flex flex-col items-center transition-colors"
            >
              <FaHome className="text-orange-500 text-xl mb-1" />
              <span className="text-sm font-medium">Home</span>
            </Link>
            
            <button 
              onClick={() => setActiveTab("newRequest")}
              className="bg-gray-50 hover:bg-gray-100 p-3 rounded-lg flex flex-col items-center transition-colors"
            >
              <FaTruck className="text-orange-500 text-xl mb-1" />
              <span className="text-sm font-medium">New Delivery</span>
            </button>
            
            <Link 
              to="/notifications" 
              className="bg-gray-50 hover:bg-gray-100 p-3 rounded-lg flex flex-col items-center transition-colors"
            >
              <FaBell className="text-orange-500 text-xl mb-1" />
              <span className="text-sm font-medium">Notifications</span>
            </Link>
            
            <Link 
              to="/help" 
              className="bg-gray-50 hover:bg-gray-100 p-3 rounded-lg flex flex-col items-center transition-colors"
            >
              <FaQuestionCircle className="text-orange-500 text-xl mb-1" />
              <span className="text-sm font-medium">Help</span>
            </Link>
          </div>
        </div>
      </div>
    );
  };

  // ... rest of your existing component code (activeRequests, completedRequests, handleActionClick, handleSubmit, vehicleOptions, TripStatusCard, etc.)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Dashboard Header */}
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="/Images/logo.png"
                alt="Toota Logo"
                className="w-14 h-14 cursor-pointer"
              />
              <h1 className="text-xl font-bold text-orange-500">Toota</h1>
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link
              to="/signup"
              className="text-gray-600 hover:text-orange-500 font-medium transition-colors"
            >
              Become a Driver
            </Link>
            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
              User
            </span>
            <Link to="/profile-page" className="flex items-center">
              {!imgError && email ? (
                <img
                  src={gravatarUrl}
                  alt="User avatar"
                  className="w-10 h-10 rounded-full object-cover"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors">
                  <FaUser className="text-gray-600" />
                </div>
              )}
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
            Current Request
          </button>
          <button
            className={`py-3 px-6 font-medium flex items-center ${activeTab === 'active' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('active')}
          >
            Active Deliveries
            {/* <span className="ml-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
              {activeRequests.length}
            </span> */}
          </button>
          <button
            className={`py-3 px-6 font-medium flex items-center ${activeTab === 'history' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('history')}
          >
            History
            {/* <span className="ml-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
              {completedRequests.length}
            </span> */}
          </button>
        </div>

        {/* Welcome Message Navigator */}
        <WelcomeMessage userEmail={email} />

        {/* Dashboard Content */}
        {activeTab === "newRequest" && (
          <div className="bg-white rounded-xl shadow-md p-6">
            {/* ... existing newRequest content ... */}
          </div>
        )}

        {activeTab === "active" && (
          <div className="space-y-6">
            {/* ... existing active content ... */}
          </div>
        )}

        {activeTab === "history" && (
          <div className="space-y-6">
            {/* ... existing history content ... */}
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