import React, { useState } from "react";

function SendParcel() {
  const [formData, setFormData] = useState({
    pickupLocation: "",
    dropoffLocation: "",
    vehicleType: "bike",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Parcel details submitted:", formData);
    // Here you'd usually send data to backend or trigger further logic
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-orange-500 mt-6 mb-6">Send a Parcel</h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Parcel Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your parcel"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
            rows={4}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Pickup Location</label>
          <input
            name="pickupLocation"
            type="text"
            value={formData.pickupLocation}
            onChange={handleChange}
            placeholder="Enter pickup location"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Drop-off Location</label>
          <input
            name="dropoffLocation"
            type="text"
            value={formData.dropoffLocation}
            onChange={handleChange}
            placeholder="Enter drop-off location"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Select Vehicle Type</label>
          <select
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
          >
            <option value="bike">Bike</option>
            <option value="car">Code 8 Car</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition"
        >
          Send Parcel
        </button>
      </form>
    </div>
  );
}

export default SendParcel;
