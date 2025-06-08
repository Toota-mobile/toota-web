import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const ResetPassword = () => {
  const [pin, setPin] = useState(["", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resendMessage, setResendMessage] = useState("");
  const inputRefs = useRef([]);
  const navigate = useNavigate();

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

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && pin[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const checkPasswordMatch = () => {
    return newPassword && confirmPassword && newPassword === confirmPassword;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otp = pin.join("");
    const email = localStorage.getItem("email");

    if (!otp || otp.length < 4 || !newPassword || !confirmPassword) {
      alert("Please complete all fields.");
      return;
    }

    if (!checkPasswordMatch()) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("https://toota-web.onrender.com/auth/reset-password/user/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, new_password: newPassword }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Reset failed");
      }

      alert("Password reset successful!");
      navigate("/signin/individual");
    } catch (error) {
      alert(error.message || "Something went wrong.");
    }
  };

  const handleResend = async () => {
    try {
      const email = localStorage.getItem("email");
      const response = await fetch("https://toota-web.onrender.com/auth/forgot-password/user/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Resend failed");
      }
      setResendMessage("Reset verification code resent to your email.");
    } catch (err) {
      setResendMessage(err.message || "Could not resend code.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col justify-center items-center p-6 bg-cover bg-center" style={{ backgroundImage: "url('public/images/vcd.jpg')" }}>
        <form onSubmit={handleSubmit} className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-full max-w-md text-center">
          <h2 className="text-2xl font-bold text-orange-500 mb-6">Reset Password</h2>
          <p className="mb-4 text-gray-700">Enter the 4-digit code sent to your email and choose a new password.</p>

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

          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            className="w-full mb-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />

          {confirmPassword && (
            <p className={`text-sm mb-4 ${checkPasswordMatch() ? "text-green-600" : "text-red-500"}`}>
              {checkPasswordMatch() ? "✓ Passwords match" : "✗ Passwords do not match"}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 cursor-pointer"
            disabled={!checkPasswordMatch()}
          >
            Reset Password
          </button>

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
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
