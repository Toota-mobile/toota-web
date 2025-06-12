import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserPlus, FaSignInAlt, FaArrowLeft } from "react-icons/fa";
import { ChevronDown } from "lucide-react";
import Navbar from "./Navbar"; 

const IndividualSignup = () => {
  const navigate = useNavigate(); // Initialize navigate for redirection
  const dropdownRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "" // Added confirm password field
  });

  // Phone number specific state
  const [selectedCountry, setSelectedCountry] = useState({
    code: '+27',
    flag: '🇿🇦',
    name: 'South Africa'
  });
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const countries = [
    { code: '+27', flag: '🇿🇦', name: 'South Africa' },
    { code: '+234', flag: '🇳🇬', name: 'Nigeria' },
    { code: '+254', flag: '🇰🇪', name: 'Kenya' },
    { code: '+233', flag: '🇬🇭', name: 'Ghana' },
    { code: '+251', flag: '🇪🇹', name: 'Ethiopia' }
  ];

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [passwordMatch, setPasswordMatch] = useState(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Update formData whenever phone number or country changes
  useEffect(() => {
    const fullPhoneNumber = phoneNumber ? `${selectedCountry.code}${phoneNumber}` : '';
    setFormData(prevState => ({
      ...prevState,
      phoneNumber: fullPhoneNumber
    }));
  }, [phoneNumber, selectedCountry]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Check password match when password or confirm password changes
    if (name === 'password' || name === 'confirmPassword') {
      checkPasswordMatch(
        name === 'password' ? value : formData.password,
        name === 'confirmPassword' ? value : formData.confirmPassword
      );
    }
  };

  // Handle phone number input changes
  const handlePhoneChange = (e) => {
    // Remove non-numeric characters except spaces and dashes
    const value = e.target.value.replace(/[^\d\s-]/g, '');
    setPhoneNumber(value);
  };

  // Handle country selection
  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
  };

  // Toggle dropdown
  const toggleDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
    console.log('Dropdown toggled:', !isDropdownOpen); // Debug log
  };

  // Check if passwords match
  const checkPasswordMatch = (password, confirmPassword) => {
    if (confirmPassword === '') {
      setPasswordMatch(null);
    } else if (password === confirmPassword) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1) Client‐side password match check
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError(null);

    // 2) Prepare payload
    const submissionData = { ...formData };
    delete submissionData.confirmPassword;
    if (formData.email) { localStorage.setItem("email", formData.email); }

    try {
      // 3) Hit signup endpoint
      const response = await fetch('https://toota-web.onrender.com/auth/signup/user/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });

      // 4) Always parse JSON
      const data = await response.json();

      // 5) If backend returned a non-2xx, extract all messages and throw
      if (!response.ok) {
        // collect top‐level "error" plus any field arrays
        const messages = [];
        if (data.error) messages.push(data.error);
        Object.values(data).forEach(val => {
          if (Array.isArray(val)) {
            val.forEach(msg => messages.push(msg));
          }
        });
        const message = messages.length ? messages.join(' ') : 'Signup failed';
        throw new Error(message);
      }

      // 6) Success!
      // console.log('Signup successful:', data);
      navigate("/verify-email", {
        state: {
          user: "user",
        },
      });
    } catch (err) {
      // console.error('Signup error:', err.message);

      // 7) Redirect on verification request
      if (err.message.includes('Please verify your email')) {
        navigate("/verify-email");
      }
      // 8) Show error to user
      setError(err.message || 'Something went wrong. Please try again.');

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />
     
      {/* Main Section */}
      <div className="flex-grow flex flex-col justify-center items-center p-6 bg-cover bg-center" style={{ backgroundImage: "url('/Images/vcd.jpg')" }}>
        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-full max-w-md">
          {/* Back Button */}
          <div className="self-start mb-4">
            <Link to="/signup" className="flex items-center text-orange-500 font-semibold hover:underline text-sm">
              <FaArrowLeft className="mr-2" /> Back
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-center text-orange-500 mb-6">Sign Up</h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-gray-700 font-semibold mb-1">Full Name</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-orange-400"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Updated Phone Number Field */}
            <div className="relative">
              <label className="block text-gray-700 font-semibold mb-1">Phone Number</label>
              <div className="flex border border-gray-300 rounded-lg overflow-visible focus-within:ring-2 focus-within:ring-orange-400 focus-within:border-orange-400">
                {/* Country Code Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={toggleDropdown}
                    className="flex items-center px-3 py-2 bg-gray-50 border-r border-gray-300 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition-colors h-full whitespace-nowrap"
                  >
                    <span className="text-lg mr-2">{selectedCountry.flag}</span>
                    <span className="text-sm font-medium text-gray-700 mr-1">
                      {selectedCountry.code}
                    </span>
                    <ChevronDown 
                      className={`w-4 h-4 text-gray-500 transition-transform ${
                        isDropdownOpen ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div 
                      className="absolute top-full left-0 z-[9999] bg-white border border-gray-300 rounded-lg shadow-2xl mt-1 min-w-[160px] max-h-60 overflow-y-auto"
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: '0',
                        zIndex: 9999,
                        backgroundColor: 'white',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.5rem',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                        marginTop: '0.25rem',
                        minWidth: '160px'
                      }}
                    >
                      {countries.map((country) => (
                        <button
                          key={country.code}
                          type="button"
                          onClick={() => handleCountrySelect(country)}
                          className="w-full flex items-center px-4 py-2 hover:bg-orange-50 focus:outline-none focus:bg-orange-50 transition-colors text-left border-b border-gray-100 last:border-b-0"
                        >
                          <span className="text-lg mr-3">{country.flag}</span>
                          <span className="text-sm font-medium text-gray-900">
                            {country.code}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Phone Number Input */}
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder="Enter phone number"
                  className="flex-1 px-4 py-2 focus:outline-none text-gray-900 placeholder-gray-500"
                  required
                />
              </div>
              
              {/* Display Full Number Preview */}
              {phoneNumber && (
                <p className="mt-1 text-xs text-gray-600">
                  Full number: {selectedCountry.code}{phoneNumber}
                </p>
              )}
            </div>
            
            <div>
              <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Enter your password"
                required
              />
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold mb-1">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Confirm your password"
                required
              />
              {/* Password match indicator */}
              {formData.confirmPassword && (
                <p className={`mt-1 text-sm ${
                  passwordMatch === true 
                    ? 'text-green-600' 
                    : passwordMatch === false 
                      ? 'text-red-600' 
                      : 'text-gray-600'
                }`}>
                  {passwordMatch === true 
                    ? '✓ Passwords match' 
                    : passwordMatch === false 
                      ? '✗ Passwords do not match' 
                      : ''}
                </p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={loading || passwordMatch !== true}
              className={`w-full ${
                loading || passwordMatch !== true 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-orange-500 hover:bg-orange-600'
              } text-white font-semibold py-2 px-4 rounded-lg transition flex justify-center items-center`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Sign Up'
              )}
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-700 text-center">
            Already have an account?{" "}
            <Link to="/signin" className="text-orange-500 font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default IndividualSignup;