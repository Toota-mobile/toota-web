import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  FaUser, FaTruck, FaShippingFast, FaCar, FaMotorcycle,
  FaTachometerAlt, FaMapMarkerAlt, FaImage, FaInfoCircle,
  FaArrowRight, FaStar, FaCheck, FaTimes, FaBox, FaMoneyBillWave, FaClock, FaExclamationTriangle
} from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";

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
  // const [tripId, setTripId] = useState(localStorage.getItem("tripId") || null);
  // const tripId = null
  const tab = searchParams.get("tab") || "default";

  const token = localStorage.getItem("authToken");
  const retryTimeoutRef = useRef(null);

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
    const maxDelay = 30000; // max 30 seconds

    const connectWebSocket = () => {
      socket = new WebSocket(`wss://toota-web.onrender.com/ws/trips/user/?token=${token}`);
      socketObj.current = socket;

      socket.onopen = () => {
        setIsConnected(true);
        attempt = 0; // reset on successful connection
      };

      socket.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        switch (msg.type) {
          case "trip_created":
            localStorage.setItem("tripId", msg.trip_id || "");
            const tripId = localStorage.getItem("tripId");
            // Show success notification
            setShowSuccessNotification(true);
            // Hide notification after 5 seconds
            setTimeout(() => {
              // Reset form fields
              setVehicleType("");
              setPackageDescription("");
              setParcelImage(null);
              setPickupLocation("");
              setDropoffLocation("");
              setDeliveryType("standard");
              setUrgency("normal");
              // setTripId(msg.trip_id || null);
              // Switch to active tab to show the new trip
              // setActiveTab("active");
              navigate("/payment", {
                state: {
                  tripData: msg,
                }
              });

              // Hide the notification after showing it for a bit
              setTimeout(() => {
                setShowSuccessNotification(false);
              }, 3000);
            }, 2000); // Wait 2 seconds to let user see the success message
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
        const delay = Math.min(1000 * 2 ** attempt, maxDelay); // exponential backoff
        retryTimeoutRef.current = setTimeout(connectWebSocket, delay);
      };
    };

    connectWebSocket();

    return () => {
      if (socketObj.current) socketObj.current.close();
      clearTimeout(retryTimeoutRef.current);
    };
  }, [token, navigate]);

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

    if (socketObj.current && socketObj.current.readyState === WebSocket.OPEN) {
      try {
        const requestData = {
          action: "create_trip",
          vehicle_type: vehicleType,
          pickup: pickupLocation,
          destination: dropoffLocation,
          load_description: packageDescription,
        };

        // sending request object
        socketObj.current.send(JSON.stringify(requestData));

        // DON'T reset the form immediately - wait for the WebSocket response
        // The form will be reset when we receive the "trip_created" message
        // setIsSubmitting(false);
      } catch (error) {
        alert("Error submitting request. Please try again.");
        setIsSubmitting(false);
      }
    } else {
      alert("Connection not available. Please try again.");
      setIsSubmitting(false);
    }
  }
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
  const email = localStorage.getItem("email")
  const hash = email.trim().toLowerCase()
    ? md5(email.trim().toLowerCase()).toString()
    : "";
  const gravatarUrl = `https://www.gravatar.com/avatar/${hash}?d=404&s=40`;

  const [imgError, setImgError] = useState(false);

  // reset on email change
  useEffect(() => setImgError(false), [email]);
  const tripId = localStorage.getItem("tripId");

  const TripStatusCard = ({ socketObj }) => {
    const [tripStatus, setTripStatus] = useState('confirming');
    const [tripData, setTripData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
      // Function to send confirm_trip action
      const sendConfirmTrip = () => {
        if (socketObj.current && tripId) {
          const message = {
            action: 'confirm_trip',
            trip_id: tripId
          };
          socketObj.current.send(JSON.stringify(message));
          setTripStatus('confirming');
        }
      };

      // Check WebSocket state and send message accordingly
      if (socketObj.current && tripId) {
        if (socketObj.current.readyState === WebSocket.OPEN) {
          // Connection is ready, send immediately
          sendConfirmTrip();
        } else if (socketObj.current.readyState === WebSocket.CONNECTING) {
          // Wait for connection to open
          const handleOpen = () => {
            sendConfirmTrip();
            socketObj.current.removeEventListener('open', handleOpen);
          };
          socketObj.current.addEventListener('open', handleOpen);
        }
      }

      // Set up WebSocket message listener
      const handleWebSocketMessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          switch (data.type) {
            case 'searching_driver':
              setTripStatus('searching');
              setTripData(data);
              break;
            case 'driver_assigned':
              setTripStatus('assigned');
              setTripData(data);
              break;
            case 'no_driver_found':
              setTripStatus('no_driver');
              setTripData(data);
              break;
            case 'error':
              setTripStatus('error');
              setError(data.message);
              break;
            default:
              break;
          }
        } catch (err) {
        }
      };

      if (socketObj.current) {
        socketObj.current.addEventListener('message', handleWebSocketMessage);
      }

      // Cleanup listener on unmount
      return () => {
        if (socketObj.current) {
          socketObj.current.removeEventListener('message', handleWebSocketMessage);
        }
      };
    }, [socketObj, tripId]);

    const renderStatusContent = () => {
      switch (tripStatus) {
        case 'confirming':
          return (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
              </div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">Confirming Your Trip</h3>
              <p className="text-gray-500">Please wait while we process your request...</p>
            </div>
          );

        case 'searching':
          return (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="animate-ping absolute h-12 w-12 rounded-full bg-blue-400 opacity-75"></div>
                  <div className="relative h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center">
                    <FaSearch className="text-white text-lg" />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">Searching for Driver</h3>
              <p className="text-gray-500 mb-4">We're finding the best driver for your trip...</p>
              {tripData?.payment_info && (
                <div className="bg-gray-50 rounded-lg p-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="font-medium capitalize">{tripData.payment_info.payment_method}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-bold text-orange-600">
                      {tripData.payment_info.currency} {tripData.payment_info.amount}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );

        case 'assigned':
          return (
            <div className="bg-white rounded-lg shadow-md p-5 border border-green-200">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <FaCheck className="text-green-600 text-xl" />
                </div>
              </div>
              <div className="text-center mb-6">
                <h3 className="font-bold text-lg mb-1 text-green-700">Driver Assigned!</h3>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Trip Confirmed
                </span>
              </div>

              {tripData?.driver_info && (
                <div className="border-t border-gray-200 pt-4 mb-4">
                  <h4 className="font-medium text-gray-700 mb-3">Driver Information</h4>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                      <span className="text-gray-600 font-medium text-lg">
                        {tripData.driver_info.name?.charAt(0) || 'D'}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-lg">{tripData.driver_info.name || 'Driver'}</p>
                      <div className="flex items-center mt-1">
                        <FaStar className="text-yellow-500 mr-1" />
                        <span className="text-sm text-gray-600">
                          {tripData.driver_info.rating || 'N/A'}
                        </span>
                        <span className="mx-2 text-gray-300">•</span>
                        <span className="text-sm text-gray-600">
                          {tripData.driver_info.vehicle || 'Vehicle'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {tripData?.payment_info && (
                <div className="bg-green-50 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Payment:</span>
                    <span className="font-medium capitalize text-green-700">
                      {tripData.payment_info.payment_method} - {tripData.payment_info.payment_status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-bold text-green-600">
                      {tripData.payment_info.currency} {tripData.payment_info.amount}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <button className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 flex-1">
                  Track Delivery
                </button>
                <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300 flex-1">
                  Contact Driver
                </button>
              </div>
            </div>
          );

        case 'no_driver':
          return (
            <div className="bg-white rounded-lg shadow-md p-6 text-center border border-yellow-200">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                  <FaClock className="text-yellow-600 text-xl" />
                </div>
              </div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">No Drivers Available</h3>
              <p className="text-gray-500 mb-4">
                We couldn't find an available driver at the moment. Don't worry - your trip request
                has been saved and will be automatically forwarded to drivers when they become available.
              </p>
              <div className="bg-yellow-50 rounded-lg p-4 mb-4">
                <p className="text-yellow-800 text-sm">
                  <FaBell className="inline mr-2" />
                  You'll be notified as soon as a driver accepts your trip request.
                </p>
              </div>
              <button
                onClick={() => {
                  // Retry trip confirmation
                  if (socketObj.current && tripId) {
                    const message = {
                      action: 'confirm_trip',
                      trip_id: tripId
                    };
                    socketObj.current.send(JSON.stringify(message));
                    setTripStatus('confirming');
                  }
                }}
                className="bg-orange-500 text-white py-2 px-6 rounded hover:bg-orange-600"
              >
                Try Again
              </button>
            </div>
          );

        case 'error':
          return (
            <div className="bg-white rounded-lg shadow-md p-6 text-center border border-red-200">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <FaExclamationTriangle className="text-red-600 text-xl" />
                </div>
              </div>
              <h3 className="text-xl font-medium text-red-700 mb-2">Something went wrong</h3>
              <p className="text-gray-500 mb-4">{error || 'An unexpected error occurred.'}</p>
              <div className="flex space-x-3 justify-center">
                <button
                  onClick={() => {
                    // Retry trip confirmation
                    if (socketObj.current && tripId) {
                      const message = {
                        action: 'confirm_trip',
                        trip_id: tripId
                      };
                      socketObj.current.send(JSON.stringify(message));
                      setTripStatus('confirming');
                      setError(null);
                    }
                  }}
                  className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
                >
                  Try Again
                </button>
                <button
                  onClick={() => setActiveTab("newRequest")}
                  className="bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300"
                >
                  New Request
                </button>
              </div>
            </div>
          );

        default:
          return null;
      }
    };

    return renderStatusContent();
  };

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
                    className="bg-white border-2 border-orange-500 rounded-xl p-6 flex flex-col items-center hover:bg-orange-50 transition-colors cursor-pointer"
                  >
                    <div className="bg-orange-100 p-4 rounded-full mb-4">
                      <FaTruck className="text-3xl text-orange-500" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Send Parcel</h3>
                    <p className="text-gray-600 text-sm">Small packages, documents, and regular items</p>
                  </button>

                  <button
                    onClick={() => handleActionClick("moveLargeItems")}
                    className="bg-white border-2 border-orange-500 rounded-xl p-6 flex flex-col items-center hover:bg-orange-50 transition-colors cursor-pointer"
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
                  className="flex items-center text-orange-500 mb-6 hover:underline cursor-pointer"
                >
                  ← back to request types
                </button>

                <h2 className="text-2xl font-bold text-orange-500 mb-2 flex items-center gap-2">
                  {selectedAction === "sendParcel" ? (
                    <><FaTruck /> Send Parcel</>
                  ) : (
                    <><FaShippingFast /> Move Large Items</>
                  )}
                </h2>
                <p className="text-gray-600 mb-6">Fill in the details below to request a delivery</p>

                <form  className="space-y-6">
                  {/* Success Notification */}
                  {showSuccessNotification && (
                    <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center gap-2 animate-fade-in">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span className="font-medium">Trip successfully created! Your request has been submitted.</span>
                      <button
                        onClick={() => setShowSuccessNotification(false)}
                        className="ml-auto text-green-600 hover:text-green-800"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      </button>
                    </div>
                  )}

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
                    onClick={handleSubmit}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors disabled:bg-orange-400 disabled:cursor-not-allowed flex justify-center items-center gap-2 cursor-pointer"
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
            {/* Main Trip Status Card - Shows current trip */}
            {tripId ? (
              <TripStatusCard
                socketObj={socketObj}
                tripId={tripId}
              />
            ) : (
              /* Empty State - Show when no active trip */
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