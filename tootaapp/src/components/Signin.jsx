import React from "react";
import { Link } from "react-router-dom";
import { FaUserPlus, FaSignInAlt } from "react-icons/fa";
import Navbar from "./Navbar"; 

function Signin() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col"
      style={{ backgroundImage: "url('images/red.jpg')" }}
    >
     <Navbar />

      {/* Main Section */}
      <main className="flex-grow flex flex-col justify-center items-center p-6 pt-32">
        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-6 text-orange-500">Choose Sign In Type</h1>

          <div className="space-y-4">
            <Link
              to="/signin/driver"
              className="block w-64 text-center bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold"
            >
              Driver
            </Link>
            <Link
              to="/signin/individual"
              className="block w-64 text-center bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold"
            >
              Individual
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Signin;
