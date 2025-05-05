import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLock, FaEye, FaEyeSlash, FaEdit, FaSave } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const [editMode, setEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // User data state
  const [user, setUser] = useState({
    fullName: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+27 123 456 7890',
    password: 'currentPassword123',
    address: '456 Oak Street, Cape Town',
    preferredPayment: 'Credit Card ****4242',
    deliveryInstructions: 'Leave at front gate if not home'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call to update user profile would go here
    alert('Profile updated successfully!');
    setEditMode(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 fixed top-0 left-0 right-0 z-50">
  <div className="container mx-auto flex justify-between items-center">
    <div className="flex items-center space-x-4">
      <button 
        onClick={() => window.history.back()} 
        className="text-gray-600 hover:text-orange-500 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </button>
      <Link to="/" className="flex items-center space-x-2">
        <img 
          src="public/images/logo.png" 
          alt="Toota Logo" 
          className="w-14 h-14"
        />
        <span className="text-2xl font-bold text-orange-500">Toota</span>
      </Link>
    </div>
    <nav className="flex items-center space-x-6">
      <Link to="/" className="text-gray-600 hover:text-orange-500 font-medium transition-colors">
        Home
      </Link>
      <Link to="/about" className="text-gray-600 hover:text-orange-500 font-medium transition-colors">
        About
      </Link>
    </nav>
  </div>
</header>
      {/* Main Content */}
      <main className="container mx-auto p-4 pt-24">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-orange-400 to-orange-600 p-6 text-white">
            <div className="flex items-center">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mr-6">
                <span className="text-orange-500 text-3xl font-bold">
                  {user.fullName.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold">{user.fullName}</h2>
                <p className="text-orange-100">Customer since 2025</p>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSubmit} className="p-6">
            {/* Personal Information */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <FaUser className="mr-2 text-orange-500" />
                Personal Information
              </h3>
              
              <div className="space-y-4">
                <div className="form-group">
                  <label className="block text-gray-700 mb-2">Full Name</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="fullName"
                      value={user.fullName}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded"
                      required
                    />
                  ) : (
                    <p className="p-3 bg-gray-50 rounded">{user.fullName}</p>
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
                      value={user.email}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded"
                      required
                    />
                  ) : (
                    <p className="p-3 bg-gray-50 rounded">{user.email}</p>
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
                      value={user.phone}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded"
                      required
                    />
                  ) : (
                    <p className="p-3 bg-gray-50 rounded">{user.phone}</p>
                  )}
                </div>

                <div className="form-group">
                  <label className="block text-gray-700 mb-2 items-center">
                    <FaMapMarkerAlt className="mr-2 text-orange-500" />
                    Address
                  </label>
                  {editMode ? (
                    <textarea
                      name="address"
                      value={user.address}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded"
                      rows="3"
                      required
                    />
                  ) : (
                    <p className="p-3 bg-gray-50 rounded whitespace-pre-line">{user.address}</p>
                  )}
                </div>

                {editMode && (
                  <div className="form-group">
                    <label className="block text-gray-700 mb-2 items-center">
                      <FaLock className="mr-2 text-orange-500" />
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-500"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Delivery Preferences */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Delivery Preferences</h3>
              
              <div className="space-y-4">
                <div className="form-group">
                  <label className="block text-gray-700 mb-2">Preferred Payment Method</label>
                  {editMode ? (
                    <select
                      name="preferredPayment"
                      value={user.preferredPayment}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded"
                    >
                      <option value="Credit Card ****4242">Credit Card ****4242</option>
                      <option value="Cash on Delivery">Cash on Delivery</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                    </select>
                  ) : (
                    <p className="p-3 bg-gray-50 rounded">{user.preferredPayment}</p>
                  )}
                </div>

                <div className="form-group">
                  <label className="block text-gray-700 mb-2">Special Delivery Instructions</label>
                  {editMode ? (
                    <textarea
                      name="deliveryInstructions"
                      value={user.deliveryInstructions}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded"
                      rows="2"
                    />
                  ) : (
                    <p className="p-3 bg-gray-50 rounded whitespace-pre-line">
                      {user.deliveryInstructions || 'None specified'}
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
                    className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 flex items-center"
                  >
                    <FaSave className="mr-2" />
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setEditMode(true)}
                  className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 flex items-center"
                >
                  <FaEdit className="mr-2" />
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

export default ProfilePage;