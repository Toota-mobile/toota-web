import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserPlus, FaSignInAlt, FaBars, FaTimes } from "react-icons/fa";
import Navbar from "./Navbar"; 

function Signup() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col"
      style={{ backgroundImage: "url('images/G.jpg')" }}
    >
    <Navbar/>
      {/* Main Content */}
      <div className="flex-grow flex flex-col justify-center items-center px-6 pt-32 pb-12">
        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-6 text-orange-500">Choose Signup Type</h1>
          <div className="space-y-4">
            <Link to="/signup/driver" className="block w-64 text-center bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold">
              Driver
            </Link>
            <Link to="/signup/individual" className="block w-64 text-center bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold">
              Individual
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
