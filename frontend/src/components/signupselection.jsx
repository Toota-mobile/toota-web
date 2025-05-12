import React from "react";
import { Link } from "react-router-dom";

function SignupSelection() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-orange-500 mb-8">Sign Up As</h1>

      <div className="grid gap-6 sm:grid-cols-3 w-full max-w-4xl">
        {/* Driver */}
        <Link to="/signup/driver" className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2 text-black">Driver</h2>
          <p className="text-gray-600 text-sm">Deliver goods and earn with Toota.</p>
        </Link>

        {/* Business */}
        <Link to="/signup/business" className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2 text-black">Business</h2>
          <p className="text-gray-600 text-sm">Ship your products reliably and fast.</p>
        </Link>

        {/* Individual */}
        <Link to="/signup/individual" className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2 text-black">Individual</h2>
          <p className="text-gray-600 text-sm">Send packages quickly and easily.</p>
        </Link>
      </div>
    </div>
  );
}

export default SignupSelection;
