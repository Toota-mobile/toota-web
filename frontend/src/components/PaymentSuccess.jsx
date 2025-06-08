import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FaCheckCircle,
    FaSpinner,
    FaExclamationTriangle,
    FaRoute,
    FaClock,
    FaMoneyBillWave,
    FaArrowRight,
    FaHome,
    FaReceipt
} from 'react-icons/fa';

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const [verificationStatus, setVerificationStatus] = useState('verifying'); // 'verifying', 'success', 'failed'
    const [paymentData, setPaymentData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        // Extract tx_ref from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const txRef = urlParams.get('tx_ref') || urlParams.get('trxref');
        // const status = urlParams.get('status');
        // const transactionId = urlParams.get('transaction_id');

        if (!txRef) {
            setVerificationStatus('failed');
            setErrorMessage('Missing transaction reference. Please contact support.');
            return;
        }

        // Check if payment was cancelled
        // if (status === 'cancelled') {
        //     setVerificationStatus('failed');
        //     setErrorMessage('Payment was cancelled. You can try again.');
        //     return;
        // }

        // Verify payment with backend
        verifyPayment(txRef);
    }, []);

    useEffect(() => {
        // Countdown for auto-redirect on success
        if (verificationStatus === 'success' && countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 5000);
            return () => clearTimeout(timer);
        } else if (verificationStatus === 'success' && countdown === 0) {
            // Auto redirect to dashboard or trips page
            handleGoToDashboard();
        }
    }, [verificationStatus, countdown]);

    const verifyPayment = async (txRef) => {
        try {
            const response = await fetch('https://toota-web.onrender.com/payment/verify/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ transaction_id: txRef }),
            });

            const data = await response.json();

            if (response.ok && data.status === 'success') {
                setVerificationStatus('success');
                setPaymentData(data);
            } else {
                setVerificationStatus('failed');
                setErrorMessage(data.message || 'Payment verification failed. Please contact support.');
            }
        } catch (error) {
            // console.error('Payment verification error:', error);
            setVerificationStatus('failed');
            setErrorMessage('Unable to verify payment. Please check your connection and try again.');
        }
    };

    const handleRetryVerification = () => {
        setVerificationStatus('verifying');
        const urlParams = new URLSearchParams(window.location.search);
        const txRef = urlParams.get('tx_ref') || urlParams.get('trxref');
        // const status = urlParams.get('status');
        // const transactionId = urlParams.get('transaction_id');
        verifyPayment(txRef);
    };

    const handleGoToDashboard = () => {
        // Replace with your actual navigation logic
        navigate("/profile?tab=active");
    };

    const handleGoToTrips = () => {
        // Replace with your actual navigation logic
        window.location.href = '/trips';
    };

    const handleGoHome = () => {
        // Replace with your actual navigation logic
        window.location.href = '/';
    };

    const formatAmount = (amount, currency = 'NGN') => {
        return `${currency} ${parseFloat(amount).toLocaleString()}`;
    };

    if (verificationStatus === 'verifying') {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-md p-8 max-w-md w-full text-center">
                    <div className="mb-6">
                        <FaSpinner className="text-orange-500 text-4xl mx-auto mb-4 animate-spin" />
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Verifying Payment</h2>
                        <p className="text-gray-600">Please wait while we confirm your payment...</p>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="animate-pulse flex space-x-1">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (verificationStatus === 'failed') {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-md p-8 max-w-md w-full text-center">
                    <div className="mb-6">
                        <FaExclamationTriangle className="text-red-500 text-4xl mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Verification Failed</h2>
                        <p className="text-gray-600 mb-4">{errorMessage}</p>
                    </div>
                    <div className="space-y-3">
                        <button
                            onClick={handleRetryVerification}
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                        >
                            Retry Verification
                        </button>
                        <button
                            onClick={handleGoHome}
                            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors"
                        >
                            Go to Home
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Success Header */}
                <div className="bg-white rounded-xl shadow-md p-8 mb-6 text-center">
                    <div className="mb-6">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaCheckCircle className="text-green-600 text-3xl" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
                        <p className="text-gray-600">Your trip has been confirmed and paid for.</p>
                    </div>

                    {/* Auto redirect notice */}
                    <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                        <p className="text-sm">
                            Redirecting to dashboard in <span className="font-bold">{countdown}</span> seconds...
                        </p>
                    </div>
                </div>

                {/* Payment Details */}
                {paymentData && (
                    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                        <div className="flex items-center gap-2 mb-4">
                            <FaReceipt className="text-orange-500" />
                            <h2 className="text-xl font-bold text-gray-800">Payment Details</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                    <span className="text-gray-600">Transaction ID</span>
                                    <span className="font-medium text-sm">{paymentData.payment_reference}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                    <span className="text-gray-600">Payment Method</span>
                                    <span className="font-medium capitalize">{paymentData.payment_method || 'Card'}</span>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                    <span className="text-gray-600">Amount Paid</span>
                                    <span className="font-medium">{formatAmount(paymentData.amount, paymentData.currency)}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                    <span className="text-gray-600">Trip ID</span>
                                    <span className="font-medium">#{paymentData.trip_id}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Action Button */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">What's Next?</h3>
                    <div className="flex justify-center">
                        <button
                            onClick={handleGoToDashboard}
                            className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                        >
                            <FaArrowRight />
                            Go to Dashboard
                        </button>
                    </div>
                </div>

                {/* Support Info */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        Need help? Contact our support team at{' '}
                        <a href="mailto:support@yourapp.com" className="text-orange-500 hover:text-orange-600">
                            support@yourapp.com
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;