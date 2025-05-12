import React, { useState } from "react";
import { FaUser, FaPhone, FaStar, FaEnvelope, FaCar, FaIdCard, FaShieldAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';

const DriverProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Profile data state
  const [profile, setProfile] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+27 123 456 7890",
    password: "currentPassword123",
    vehicleType: "Van",
    makeModel: "Ford Transit 250",
    year: "2021",
    licensePlate: "CA 123-456",
    cargoCapacity: "1500 lbs / 300 cu ft",
    licenseType: "Class C (Standard)",
    licenseNumber: "DL12345678",
    licenseExpiry: "2025-12-31"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the updated data to your backend
    alert('Profile updated successfully!');
    setEditMode(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header (consistent with your dashboard) */}
      <header className="bg-white shadow-sm p-4 fixed top-0 left-0 right-0 z-50">
  <div className="container mx-auto flex justify-between items-center">
    <h1 className="text-2xl font-bold text-orange-500">Driver Profile</h1>
    <nav className="flex items-center space-x-6">
      <Link 
        to="/driver-dashboard" 
        className="flex items-center space-x-2 text-gray-600 hover:text-orange-500 font-medium group"
      >
        <img 
          src="public/images/logo.png" 
          alt="Dashboard"
          className="h-14 w-14 object-contain transition-transform group-hover:scale-105"
        />
        <span className="hidden sm:inline">Dashboard</span> {/* Text hidden on mobile */}
      </Link>
    </nav>
  </div>
</header>
      {/* Main Content */}
      <main className="container mx-auto p-4 pt-24">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Profile Header */}
          <div className="bg-orange-500 p-6 text-white">
            <div className="flex items-center">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mr-6">
                <span className="text-orange-500 text-3xl font-bold">JD</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold">{profile.fullName}</h2>
                <p className="flex items-center">
                  <FaStar className="mr-1 text-yellow-300" />
                  <span>4.9/5.0 (120+ deliveries)</span>
                </p>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSubmit} className="p-6">
            {/* Personal Information Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <FaUser className="mr-2 text-orange-500" />
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="block text-gray-700 mb-2">Full Name</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="fullName"
                      value={profile.fullName}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded"
                      required
                    />
                  ) : (
                    <p className="p-3 bg-gray-50 rounded">{profile.fullName}</p>
                  )}
                </div>

                <div className="form-group">
                  <label className="block text-gray-700 mb-2 items-center">
                    <FaEnvelope className="mr-2 text-orange-500" />
                    Email
                  </label>
                  {editMode ? (
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded"
                      required
                    />
                  ) : (
                    <p className="p-3 bg-gray-50 rounded">{profile.email}</p>
                  )}
                </div>

                <div className="form-group">
                  <label className="block text-gray-700 mb-2 items-center">
                    <FaPhone className="mr-2 text-orange-500" />
                    Phone Number
                  </label>
                  {editMode ? (
                    <input
                      type="tel"
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded"
                      required
                    />
                  ) : (
                    <p className="p-3 bg-gray-50 rounded">{profile.phone}</p>
                  )}
                </div>

                {editMode && (
                  <div className="form-group">
                    <label className="block text-gray-700 mb-2 items-center">
                      <FaShieldAlt className="mr-2 text-orange-500" />
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={profile.password}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-3 text-gray-500"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Vehicle Information Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <FaCar className="mr-2 text-orange-500" />
                Vehicle Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="block text-gray-700 mb-2">Vehicle Type</label>
                  {editMode ? (
                    <select
                      name="vehicleType"
                      value={profile.vehicleType}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded"
                      required
                    >
                      <option value="Sedan">Sedan</option>
                      <option value="SUV">SUV</option>
                      <option value="Van">Van</option>
                      <option value="Pickup Truck">Pickup Truck</option>
                      <option value="Box Truck">Box Truck</option>
                    </select>
                  ) : (
                    <p className="p-3 bg-gray-50 rounded">{profile.vehicleType}</p>
                  )}
                </div>

                <div className="form-group">
                  <label className="block text-gray-700 mb-2">Make/Model</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="makeModel"
                      value={profile.makeModel}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded"
                      required
                    />
                  ) : (
                    <p className="p-3 bg-gray-50 rounded">{profile.makeModel}</p>
                  )}
                </div>

                <div className="form-group">
                  <label className="block text-gray-700 mb-2">Year</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="year"
                      value={profile.year}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded"
                      required
                    />
                  ) : (
                    <p className="p-3 bg-gray-50 rounded">{profile.year}</p>
                  )}
                </div>

                <div className="form-group">
                  <label className="block text-gray-700 mb-2">License Plate</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="licensePlate"
                      value={profile.licensePlate}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded"
                      required
                    />
                  ) : (
                    <p className="p-3 bg-gray-50 rounded">{profile.licensePlate}</p>
                  )}
                </div>

                <div className="form-group">
                  <label className="block text-gray-700 mb-2">Cargo Capacity</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="cargoCapacity"
                      value={profile.cargoCapacity}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded"
                      required
                    />
                  ) : (
                    <p className="p-3 bg-gray-50 rounded">{profile.cargoCapacity}</p>
                  )}
                </div>
              </div>
            </div>

            {/* License Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <FaIdCard className="mr-2 text-orange-500" />
                License Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="block text-gray-700 mb-2">License Type</label>
                  {editMode ? (
                    <select
                      name="licenseType"
                      value={profile.licenseType}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded"
                      required
                    >
                      <option value="Class C (Standard)">Class C (Standard)</option>
                      <option value="Class B (Medium Truck)">Class B (Medium Truck)</option>
                      <option value="Class A (CDL)">Class A (CDL)</option>
                    </select>
                  ) : (
                    <p className="p-3 bg-gray-50 rounded">{profile.licenseType}</p>
                  )}
                </div>

                <div className="form-group">
                  <label className="block text-gray-700 mb-2">License Number</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="licenseNumber"
                      value={profile.licenseNumber}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded"
                      required
                    />
                  ) : (
                    <p className="p-3 bg-gray-50 rounded">••••••••</p> // Masked for security
                  )}
                </div>

                <div className="form-group">
                  <label className="block text-gray-700 mb-2">License Expiry</label>
                  {editMode ? (
                    <input
                      type="date"
                      name="licenseExpiry"
                      value={profile.licenseExpiry}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded"
                      required
                    />
                  ) : (
                    <p className="p-3 bg-gray-50 rounded">
                      {new Date(profile.licenseExpiry).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
              {editMode ? (
                <>
                  <button
                    type="button"
                    onClick={() => setEditMode(false)}
                    className="px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setEditMode(true)}
                  className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default DriverProfile;