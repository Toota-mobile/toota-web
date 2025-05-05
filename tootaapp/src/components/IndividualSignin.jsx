import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUserPlus, FaSignInAlt } from "react-icons/fa";

function IndividualSignin() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate successful login
    navigate("/profile");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="navbar flex justify-between items-center p-4 bg-opacity-80 bg-black text-white">
        <div className="flex space-x-4 items-center">
          <img src="public/images/logo.png" alt="Toota Logo" className="w-12 h-12" />
          <h1 className="text-xl font-bold text-orange-500">Toota</h1>
          <div className="hidden sm:flex space-x-3">
            <Link to="/" className="hover:text-orange-300">Home</Link>
            <Link to="/about" className="hover:text-orange-300">About</Link>
            <Link to="/services" className="hover:text-orange-300">Services</Link>
          </div>
        </div>
        <div className="flex space-x-2">
           <Link to="/signup" className="bg-white-500 text-black px-3 py-2 rounded flex items-center gap-2 hover:bg-gray-300 text-sm">
             <FaUserPlus /> Sign Up
            </Link>
         <Link to="/signin" className="bg-orange-500 text-white px-3 py-2 rounded flex items-center gap-2 hover:bg-orange-600 text-sm">
         <FaSignInAlt /> Sign In
        </Link>
      </div>
     </nav>
      {/* Main Content */}
      <div
        className="flex-grow flex flex-col items-center justify-center bg-cover bg-center px-4"
        style={{ backgroundImage: "url('public/images/close.jpg')" }}
      >
        <div className="bg-white bg-opacity-80 p-6 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-orange-500 mb-4 text-center">User Sign In</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded"
            >
              Sign In
            </button>
          </form>
          <p className="mt-4 text-sm text-center">
            Don't have an account?{" "}
            <Link to="/signup/individual" className="text-orange-500">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default IndividualSignin;
