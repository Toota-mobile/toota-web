import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    FaMapMarkerAlt,
    FaArrowRight,
    FaMoneyBillWave,
    FaClock,
    FaRoute,
    FaCreditCard,
    FaSpinner,
    FaCheckCircle,
    FaExclamationTriangle
} from 'react-icons/fa';

const TripDetailsTab = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [tripData, setTripData] = useState(location.state?.tripData || null);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null); // null, 'success', 'error'
    const [errorMessage, setErrorMessage] = useState('');
    const [paymentMethod, setPaymentMethod] = useState("cash");


    useEffect(() => {
        if (!tripData) {
            setTimeout(() => {
                navigate('/profile'); // Redirect to profile if no trip data is available
            }, 5000); // Redirect after 3 seconds
        }
    }, [tripData, navigate]);
    const handlePayment = async () => {
        setIsProcessingPayment(true);
        setPaymentStatus(null);
        setErrorMessage('');

        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`https://toota-web.onrender.com/payment/?token=${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    trip_id: tripData.trip_id,
                    payment_method: paymentMethod,
                    currency: "NGN",
                    location: "NG",
                    amount: tripData.estimated_fare,
                    // Add other required payment fields here
                }),
            });

            if (response.ok) {
                const result = await response.json();
                if (result.payment_link) {
                    // Redirect to payment link if available
                    window.location.href = result.payment_link;
                }
                else {
                    setPaymentStatus('success');
                    setTripData(prev => ({ ...prev, status: 'paid' }));
                }
            } else {
                const errorData = await response.json();
                setPaymentStatus('error');
                setErrorMessage(errorData.message || 'Payment failed. Please try again.');
            }
        } catch (error) {
            setPaymentStatus('error');
            setErrorMessage('Network error. Please check your connection and try again.');
        } finally {
            setIsProcessingPayment(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'paid':
                return 'bg-green-100 text-green-800';
            case 'in_progress':
                return 'bg-blue-100 text-blue-800';
            case 'completed':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };
    if (!tripData) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <FaExclamationTriangle className="text-yellow-500 text-3xl mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-800 mb-2">No Trip Found</h2>
                <p className="text-gray-600">You need to create a trip before proceeding to payment.</p>
                <p className="text-sm text-gray-400 mt-2">Redirecting you to create a trip...</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-md p-6">
            <div className="mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Trip Details</h2>
                        <div className="flex items-center gap-3">
                            <span className="text-gray-600">Trip ID: #{tripData.trip_id}</span>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(tripData.status)}`}>
                                {tripData.status.charAt(0).toUpperCase() + tripData.status.slice(1)}
                            </span>
                        </div>
                    </div>
                    <div className="mt-3 md:mt-0">
                        <span className="text-lg font-bold text-orange-500">{tripData.trip_type}</span>
                    </div>
                </div>

                {/* Payment Status Notifications */}
                {paymentStatus === 'success' && (
                    <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center gap-2 mb-4">
                        <FaCheckCircle className="text-green-600" />
                        <span className="font-medium">Payment successful! Your trip has been confirmed.</span>
                    </div>
                )}

                {paymentStatus === 'error' && (
                    <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center gap-2 mb-4">
                        <FaExclamationTriangle className="text-red-600" />
                        <span className="font-medium">{errorMessage}</span>
                    </div>
                )}
            </div>

            {/* Trip Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Locations */}
                <div className="md:col-span-2">
                    <h3 className="font-medium text-gray-700 mb-3 flex items-center">
                        <FaRoute className="text-orange-500 mr-2" /> Route Details
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-start gap-4">
                            <div className="flex flex-col items-center">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <div className="w-0.5 h-12 bg-gray-300 my-2"></div>
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            </div>
                            <div className="flex-1">
                                <div className="mb-4">
                                    <p className="text-sm text-gray-600 mb-1">Pickup Location</p>
                                    <p className="font-medium text-gray-800">{tripData.pickup_location}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Drop-off Location</p>
                                    <p className="font-medium text-gray-800">{tripData.dropoff_location}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trip Stats */}
                <div>
                    <h3 className="font-medium text-gray-700 mb-3 flex items-center">
                        <FaClock className="text-orange-500 mr-2" /> Duration & Distance
                    </h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="text-gray-600">Estimated Time</span>
                            <span className="font-medium">{tripData.estimated_time}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="text-gray-600">Distance</span>
                            <span className="font-medium">{tripData.distance} km</span>
                        </div>
                    </div>
                </div>

                {/* Fare Details */}
                <div>
                    <h3 className="font-medium text-gray-700 mb-3 flex items-center">
                        <FaMoneyBillWave className="text-orange-500 mr-2" /> Fare Breakdown
                    </h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="text-gray-600">Vehicle Type</span>
                            <span className="font-medium">{tripData.vehicle_type}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                            <span className="text-gray-800 font-medium">Total Fare</span>
                            <span className="font-bold text-lg text-orange-600">{tripData.estimated_fare}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="my-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Select Payment Method</h3>
                <div className="flex flex-col space-y-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="cash"
                            checked={paymentMethod === "cash"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <span>Cash</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="card"
                            checked={paymentMethod === "card"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <span>Card</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="bank_transfer"
                            checked={paymentMethod === "bank_transfer"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <span>Bank Transfer</span>
                    </label>
                </div>
            </div>
            {/* Payment Section */}
            <div className="border-t border-gray-200 pt-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    {tripData.status === 'pending' && (
                        <button
                            onClick={handlePayment}
                            disabled={isProcessingPayment}
                            className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                        >
                            {isProcessingPayment ? (
                                <>
                                    <FaSpinner className="animate-spin" />
                                    Processing Payment...
                                </>
                            ) : (
                                <>
                                    <FaCreditCard />
                                    Pay {tripData.estimated_fare}
                                </>
                            )}
                        </button>
                    )}

                    {tripData.status === 'paid' && (
                        <button
                            className="flex-1 bg-green-500 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 cursor-default"
                        >
                            <FaCheckCircle />
                            Payment Complete
                        </button>
                    )}

                    <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors cursor-pointer">
                        Cancel Trip
                    </button>
                </div>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-500">
                        Secure payment powered by Paystack • Your payment information is encrypted
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TripDetailsTab;