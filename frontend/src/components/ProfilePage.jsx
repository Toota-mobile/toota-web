import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, FaSave } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import MD5 from "crypto-js/md5";


const ProfilePage = () => {
  const email = localStorage.getItem("email")
  const hash = email.trim().toLowerCase()
    ? MD5(email.trim().toLowerCase()).toString()
    : "";
  const gravatarUrl = `https://www.gravatar.com/avatar/${hash}?d=404&s=40`;

  const [imgError, setImgError] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken'));


  // reset on email change
  useEffect(() => setImgError(false), [email]);
  const [editMode, setEditMode] = useState(false);

  const fetchProfile = async () => {
    try {
      const currentToken = localStorage.getItem('authToken');
      const response = await fetch("https://toota-web.onrender.com/auth/profile/user/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${currentToken}`
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch profile data');
      }
      const data = await response.json();
      setUser({
        fullName: data.full_name,
        email: data.email,
        phone: data.phone_number,
        address: data.physical_address
      });
    } catch (error) {
      alert(error.message || "Something went wrong while fetching profile data.");
    }
  };

  // User data state
  useEffect(() => {
    fetchProfile(); // ✅ Actually invoke the function
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://toota-web.onrender.com/auth/profile/user/", {
        method: "PATCH", // Changed to PATCH to match your backend
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          full_name: user.fullName,
          email: user.email,
          phone_number: user.phone,
          physical_address: user.address
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      
      // Since backend only returns success message, refetch the updated data
      await fetchProfile();
      
      setEditMode(false);
      alert("Profile updated successfully!");
      
    } catch (error) {
      alert(error.message || "Something went wrong while updating profile."); 
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => window.history.back()}
              className="text-gray-600 hover:text-orange-500 transition-colors cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="/Images/logo.png"
                alt="Toota Logo"
                className="w-14 h-14"
              />
              <span className="text-2xl font-bold text-orange-500">Toota</span>
            </Link>
          </div>
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
                  {user && user.fullName && user.fullName.split(' ').map(n => n[0].toUpperCase()).join('')}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold">{user ? user.fullName : 'Loading...'}</h2>
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
                      value={user.fullName || ''}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded"
                      required
                    />
                  ) : (
                    <p className="p-3 bg-gray-50 rounded">{user.fullName.toUpperCase()}</p>
                  )}
                </div>

                <div className="form-group">
                  <label className="block text-gray-700 mb-2 flex items-center">
                    <FaEnvelope className="mr-2 text-orange-500" />
                    Email
                  </label>
                  {editMode ? (
                    <input
                      type="email"
                      name="email"
                      value={user.email || ''}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded"
                      required
                    />
                  ) : (
                    <p className="p-3 bg-gray-50 rounded">{user.email || 'Loading...'}</p>
                  )}
                </div>

                <div className="form-group">
                  <label className="block text-gray-700 mb-2 flex items-center">
                    <FaPhone className="mr-2 text-orange-500" />
                    Phone Number
                  </label>
                  {editMode ? (
                    <input
                      type="tel"
                      name="phone"
                      value={user.phone || ''}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded"
                      required
                    />
                  ) : (
                    <p className="p-3 bg-gray-50 rounded">{user.phone || 'Loading...'}</p>
                  )}
                </div>

                <div className="form-group">
                  <label className="block text-gray-700 mb-2 flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-orange-500" />
                    Address
                  </label>
                  {editMode ? (
                    <textarea
                      name="address"
                      value={user.address || ''}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded"
                      rows="3"
                      required
                    />
                  ) : (
                    <p className="p-3 bg-gray-50 rounded whitespace-pre-line">{user.address || 'Loading...'}</p>
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
                    className="px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 flex items-center cursor-pointer"
                  >
                    <FaSave className="mr-2" />
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setEditMode(true)}
                  className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 flex items-center cursor-pointer"
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