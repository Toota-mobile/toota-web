import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUserPlus, FaSignInAlt } from "react-icons/fa";
import Navbar from "./Navbar"; 
function IndividualSignin() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/profile");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar/>
      {/* Content with top padding for fixed navbar */}
      <div
        className="flex-grow flex flex-col items-center justify-center bg-cover bg-center px-4 pt-[88px]"
        style={{ backgroundImage: "url('images/close.jpg')" }}
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
