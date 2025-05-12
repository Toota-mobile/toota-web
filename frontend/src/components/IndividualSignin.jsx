import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "./Navbar"; 

function IndividualSignin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      localStorage.setItem("email", email);
      const response = await fetch("http://localhost:8000/auth/login/user/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        // collect any error messages
        const messages = [];
        if (data.error) messages.push(data.error);
        Object.values(data).forEach(v => {
          if (Array.isArray(v)) messages.push(...v);
        });
        throw new Error(messages.join(" ") || "Login failed");
      }

      // Example: store token if your API returns one
      if (data.token) {
        localStorage.setItem("authToken", data.token);
      }

      // Redirect on success
      navigate("/profile");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded text-white font-semibold transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600"
              }`}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="mt-4 text-sm text-center">
            Don't have an account?{" "}
            <Link to="/signup/individual" className="text-orange-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default IndividualSignin;
