import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserPlus, FaSignInAlt, FaArrowLeft, FaUser, FaEnvelope, FaPhone, FaLock, FaChevronDown } from "react-icons/fa";
import Navbar from "./Navbar";

const IndividualSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    countryCode: "+234", // Default to Nigeria
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [passwordMatch, setPasswordMatch] = useState(null);

  // Common country codes
  const countryCodes = [
    { code: "+27", name: "South Africa" },
    { code: "+234", name: "Nigeria" },
    { code: "+254", name: "Kenya" },
    { code: "+233", name: "Ghana" },
    { code: "+1", name: "USA" },
    { code: "+44", name: "UK" },
    { code: "+91", name: "India" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'password' || name === 'confirmPassword') {
      checkPasswordMatch(
        name === 'password' ? value : formData.password,
        name === 'confirmPassword' ? value : formData.confirmPassword
      );
    }
  };

  const checkPasswordMatch = (password, confirmPassword) => {
    if (confirmPassword === '') {
      setPasswordMatch(null);
    } else {
      setPasswordMatch(password === confirmPassword);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Combine country code with phone number
      const submissionData = {
        ...formData,
        phoneNumber: `${formData.countryCode}${formData.phoneNumber}`,
      };
      delete submissionData.confirmPassword;
      delete submissionData.countryCode;

      localStorage.setItem("email", formData.email);

      const response = await fetch('https://toota-web.onrender.com/auth/signup/user/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });

      const data = await response.json();

      if (!response.ok) {
        const messages = data.error ? [data.error] : [];
        Object.values(data).forEach(val => Array.isArray(val) && messages.push(...val));
        throw new Error(messages.join(' ') || 'Signup failed');
      }

      navigate("/verify-email");
    } catch (err) {
      if (err.message.includes('Please verify your email')) {
        navigate("/verify-email");
      } else {
        setError(err.message || 'Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Link 
              to="/signup" 
              className="flex items-center text-orange-500 hover:text-orange-600 mr-6 transition-colors"
            >
              <FaArrowLeft className="text-lg" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
              <p className="text-gray-500">Join our community today</p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <input
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <div className="flex">
                {/* Country Code Dropdown */}
                <div className="relative w-1/3 mr-2">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    className="w-full pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none"
                  >
                    {countryCodes.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.code} {country.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <FaChevronDown className="text-gray-400 text-xs" />
                  </div>
                </div>
                
                {/* Phone Number Input */}
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPhone className="text-gray-400" />
                  </div>
                  <input
                    name="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="8123456789"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="••••••••"
                  required
                />
              </div>
              {formData.confirmPassword && (
                <p className={`mt-1 text-sm ${
                  passwordMatch ? 'text-green-600' : 'text-red-600'
                }`}>
                  {passwordMatch ? '✓ Passwords match' : '✗ Passwords do not match'}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !passwordMatch}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
                loading || !passwordMatch
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-orange-500 hover:bg-orange-600'
              } transition-colors flex items-center justify-center`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </>
              ) : (
                <>
                  <FaUserPlus className="mr-2" />
                  Sign Up
                </>
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>
              Already have an account?{" "}
              <Link to="/signin" className="font-medium text-orange-500 hover:text-orange-600">
                Sign In <FaSignInAlt className="inline ml-1" />
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default IndividualSignup;