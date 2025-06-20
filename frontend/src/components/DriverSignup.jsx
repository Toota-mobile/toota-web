import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserPlus, FaSignInAlt, FaArrowLeft, FaTruck, FaIdCard, FaPhone, FaLock, FaChevronDown } from "react-icons/fa";
import Navbar from "./Navbar";

function DriverSignup() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate password match
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    
    // Clear any previous errors
    setPasswordError("");
    navigate("/driver-dashboard");
  };

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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* Main Section */}
      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
          {/* Header Section */}
          <div className="flex items-center mb-8">
            <Link 
              to="/signup" 
              className="flex items-center text-orange-500 hover:text-orange-600 mr-6 transition-colors"
            >
              <FaArrowLeft className="mr-2" />
            </Link>
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-full mr-4">
                <FaTruck className="text-orange-500 text-2xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Driver Registration</h1>
                <p className="text-gray-500">Join our network of professional drivers</p>
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">Personal Information</h2>
            
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700" htmlFor="name">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaIdCard className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaIdCard className="text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700" htmlFor="number">
                Phone Number
              </label>
              <div className="flex">
                <div className="relative w-1/3 mr-2">
                  <select
                    className="w-full pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none"
                    defaultValue="+234"
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
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPhone className="text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="number"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                Create Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  id="password"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  id="confirmPassword"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {passwordError && (
                <p className="mt-1 text-sm text-red-600">{passwordError}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
              >
                <FaUserPlus className="mr-2" />
                Complete Registration
              </button>
            </div>
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
      </div>
    </div>
  );
}

export default DriverSignup;