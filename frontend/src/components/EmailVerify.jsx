import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const EmailVerification = () => {
  const [pin, setPin] = useState(["", "", "", ""]);
  const location = useLocation();
  const [resendMessage, setResendMessage] = useState("");
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const [user, setUser] = useState(location.state?.user || "user");

  // Automatically focus the next input
  const handleChange = (index, value) => {
    if (/^[0-9]?$/.test(value)) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);

      if (value !== "" && index < 3) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  // Handle backspace to go back to previous input
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && pin[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Watch for full pin
  useEffect(() => {
    if (pin.every((digit) => digit !== "")) {
      verifyPin(pin.join(""));
    }
  }, [pin]);

  const verifyPin = async (code) => {
    try {
      const email = localStorage.getItem("email");
      const response = await fetch("https://toota-web.onrender.com/auth/verify-email/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: code }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Verification failed");
      }

      if (user === "user") {
        navigate("/signin/individual");
      } else {
        navigate("signin/driver");
      }
    } catch (error) {
      alert(error.message || "Something went wrong.");
      setPin(["", "", "", ""]);
      inputRefs.current[0].focus();
    }
  };

  const handleResend = async () => {
    try {
      const email = localStorage.getItem("email");
      const response = await fetch("https://toota-web.onrender.com/auth/resend-code/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Resend failed");
      }
      setResendMessage("Verification code resent to your email.");
    } catch (err) {
      setResendMessage(err.message || "Could not resend code.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col justify-center items-center p-6 bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
          <h2 className="text-2xl font-bold text-orange-500 mb-6">Email Verification</h2>
          <p className="mb-4 text-gray-700">Enter the 4-digit code sent to your email.</p>

          <div className="flex justify-between space-x-4 mb-6">
            {pin.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-14 h-14 text-2xl text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            ))}
          </div>

          {/* Resend verification */}
          <div className="mt-4">
            <button
              type="button"
              onClick={handleResend}
              className="text-sm text-orange-500 hover:underline cursor-pointer"
            >
              Resend verification code
            </button>
            {resendMessage && (
              <p className="mt-2 text-sm text-gray-700">{resendMessage}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;