import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "./Navbar"; 


function IndividualSignin() {
  const navigate = useNavigate()
  // Initialize with empty strings to avoid undefined
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Forgot password states
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState("");
  const [forgotPasswordError, setForgotPasswordError] = useState("");

  // Safe change handler with validation
  const handleChange = (e) => {
    if (!e || !e.target) return;
    
    const { name, value } = e.target;
    
    if (name) {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value || ""
      }));
    }
  };

  const handleLogin = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    
    setLoading(true);
    setError(null);
    
    // Destructure here for clarity and to avoid undefined references
    const emailValue = formData?.email || "";
    const passwordValue = formData?.password || "";

    try {
      // Debug logs     
      if (!emailValue) {
        throw new Error("Email is required");
      }
      
      if (!passwordValue) {
        throw new Error("Password is required");
      }
      
      const response = await fetch("https://toota-web.onrender.com/auth/login/user/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailValue,
          password: passwordValue
        }),
      });
      
      if (!response) {
        throw new Error("No response from server");
      }
      
      const data = await response.json();

      if (!response.ok) {
        // collect any error messages
        const messages = [];
        if (data && data.error) messages.push(data.error);
        
        if (data) {
          Object.values(data).forEach(v => {
            if (Array.isArray(v)) messages.push(...v);
          });
        }
        
        throw new Error(messages.join(" ") || "Login failed");
      }

      // Example: store token if your API returns one
      if (data && data.access) {
        localStorage.setItem("authToken", data.access);
      }

      navigate('/profile');
    } catch (err) {
      setError(err.message || "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    setForgotPasswordLoading(true);
    setForgotPasswordError("");
    setForgotPasswordMessage("");

    try {
      if (!forgotPasswordEmail) {
        throw new Error("Email is required");
      }

      const response = await fetch("https://toota-web.onrender.com/auth/forgot-password/user/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: forgotPasswordEmail
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // collect any error messages
        const messages = [];
        if (data && data.error) messages.push(data.error);
        
        if (data) {
          Object.values(data).forEach(v => {
            if (Array.isArray(v)) messages.push(...v);
          });
        }
        
        throw new Error(messages.join(" ") || "Password reset request failed");
      }
      localStorage.setItem("email", forgotPasswordEmail);
      setForgotPasswordMessage("Password reset instructions have been sent to your email.");
      navigate("/reset-pwd")
      // Reset the email field after successful request
      setForgotPasswordEmail("");
      
      // Close modal after 3 seconds
      setTimeout(() => {
        setShowForgotPassword(false);
        setForgotPasswordMessage("");
      }, 3000);

    } catch (err) {
      setForgotPasswordError(err.message || "An unknown error occurred");
    } finally {
      setForgotPasswordLoading(false);
    }
  };

  const closeForgotPasswordModal = () => {
    setShowForgotPassword(false);
    setForgotPasswordEmail("");
    setForgotPasswordError("");
    setForgotPasswordMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(e);
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    handleForgotPassword(e);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar/>
      <div
        className="flex-grow flex flex-col items-center justify-center bg-cover bg-center px-4 pt-[88px]"
        style={{ backgroundImage: "url('/Images/close.jpg')" }}
      >
        <div className="bg-white bg-opacity-80 p-6 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-orange-500 mb-4 text-center">
            User Sign In
          </h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mb-4">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <input
              name="email"
              type="email"
              value={formData.email || ""}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
            <input
              name="password"
              type="password"
              value={formData.password || ""}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full py-2 rounded text-white font-semibold transition cursor-pointer ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600"
              }`}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={() => setShowForgotPassword(true)}
              className="text-orange-500 hover:underline text-sm cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>

          <p className="mt-4 text-sm text-center">
            Don't have an account?{" "}
            <Link to="/signup/individual" className="text-orange-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div 
            className="bg-white rounded-lg shadow-lg w-full max-w-md bg-cover bg-center relative overflow-hidden"
            style={{ backgroundImage: "url('/Images/close.jpg')" }}
          >
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-white bg-opacity-90"></div>
            
            {/* Modal content */}
            <div className="relative z-10 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Reset Password</h3>
                <button
                  onClick={closeForgotPasswordModal}
                  className="text-gray-500 hover:text-gray-700 text-xl font-bold cursor-pointer"
                >
                  ×
                </button>
              </div>

              {forgotPasswordError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mb-4">
                  {forgotPasswordError}
                </div>
              )}

              {forgotPasswordMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-3 py-2 rounded mb-4">
                  {forgotPasswordMessage}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    Enter your email address and we'll send you instructions to reset your password.
                  </p>
                  <input
                    type="email"
                    value={forgotPasswordEmail}
                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                    required
                  />
                </div>
                
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={closeForgotPasswordModal}
                    className="flex-1 py-2 px-4 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleForgotSubmit}
                    disabled={forgotPasswordLoading}
                    className={`flex-1 py-2 px-4 rounded text-white font-semibold transition cursor-pointer ${
                      forgotPasswordLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-orange-500 hover:bg-orange-600"
                    }`}
                  >
                    {forgotPasswordLoading ? "Sending..." : "Send Reset Link"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default IndividualSignin;