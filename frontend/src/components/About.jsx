import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const About = () => {
  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: "url('/images/G.jpg')" }}
    >
      {/* Navbar */}
      <Navbar />

      {/* About Us Section */}
      <section className="bg-white bg-opacity-90 py-16 px-6 lg:px-20 flex-grow">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          {/* About Content */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-800">About Toota</h1>
            <p className="text-gray-600 text-lg">
              At <span className="text-orange-500 font-semibold">Toota</span>, we're revolutionizing the way your goods move from point A to point B. Just like ride-sharing transformed passenger transport, we're here to make on-demand logistics seamless, efficient, and stress-free.
            </p>
            <p className="text-gray-600 text-lg">
              Whether you're sending small parcels or need to transport bulky furniture, Toota connects you with reliable delivery professionals who get the job done on your schedule. No waiting, no hidden fees, just fast and transparent service at your fingertips.
            </p>
            <p className="text-gray-600 text-lg">
              Our mission is simple: to redefine logistics with convenience, trust, and speed. We believe that moving goods should be as easy as ordering a ride, and we're committed to delivering that promise every single day.
            </p>
            <p className="text-gray-600 text-lg">
              Join us and experience a smarter way to move with Toota!
            </p>
            <img
              src="/images/deliver.jpg"
              alt="Delivery service"
              className="rounded-xl shadow-lg w-full h-64 object-cover mt-4"
            />
          </div>

          {/* Contact Section */}
          <div className="bg-gray-50 rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Contact Us</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">TOOTA INC</h3>
                
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-orange-500 mt-1" />
                  <div>
                    <p className="text-gray-700 font-medium">Our Office</p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      123 Express Lane<br />
                      Delivery City, DX 45678
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FaPhone className="text-orange-500" />
                  <p className="text-gray-600">(123) 456-7890</p>
                </div>

                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-orange-500" />
                  <p className="text-gray-600">contact@toota.com</p>
                </div>
              </div>

              {/* Contact Form */}
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none" 
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none" 
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea 
                    id="message" 
                    rows="3" 
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                    placeholder="Your message..."
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Map Embed */}
            <div className="mt-8">
              <iframe
                title="Toota Location"
                className="w-full h-64 rounded-xl border-0"
                src="https://www.google.com/maps/embed?pb=!1m18..."
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <img src="/images/logo.png" alt="Toota Logo" className="w-10 h-10 mr-3" />
              <span className="text-orange-400 font-bold text-xl">Toota</span>
            </div>

            <div className="grid grid-cols-2 md:flex gap-6 text-sm">
              <Link to="/pricing" className="text-gray-300 hover:text-orange-400 transition">Pricing</Link>
              <Link to="/about" className="text-gray-300 hover:text-orange-400 transition">About Us</Link>
              <Link to="/help" className="text-gray-300 hover:text-orange-400 transition">Help Center</Link>
              <Link to="/contact" className="text-gray-300 hover:text-orange-400 transition">Contact Us</Link>
              <Link to="/faq" className="text-gray-300 hover:text-orange-400 transition">FAQs</Link>
              <Link to="/careers" className="text-gray-300 hover:text-orange-400 transition">Careers</Link>
            </div>
          </div>

          <hr className="border-gray-700 my-6" />

          <p className="text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Toota Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default About;