import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar"; // Adjust path as needed

const About = () => {
  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: "url('images/G.jpg')" }} // Make sure this path is correct
    >
      {/* Navbar */}
      <Navbar />

      {/* About Us Section */}
      <section className="bg-white bg-opacity-90 py-16 px-6 lg:px-20 flex-grow">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          {/* About Content */}
          <div className="space-y-6">
            <h4 className="text-4xl font-bold text-gray-800">About Toota</h4>
            <p className="text-gray-600 text-lg">
              At Toota <span className="text-orange-500 font-semibold">Toota</span> — We we're recolutionizing the way your goods move from point A to point B. just like ubder transformed passenger transport, we're here to make on-demand logistics seamless, efficient, and stress free.

            </p>
            <p className="text-gray-600 text-lg">
              Whether you're sending small parce; or need to transport bulky furniture. Toota connects you with reliable delivery professionals who get the job don, on your schedule. No esiting, no hidden dees, just fast and transparent service at your fingertips.
            </p>
            <p className="text-gray-600 text-lg">
              Our mission is simple: to redefine logistics with convenience, trust, and speed. We believe that moving goods should be as easy as ordering a ride, and we're commited to delivering that promise every single day.
            </p>
            <p className="text-gray-600 text-lg">
             Join us and experience a smarter way to move with Toota!
            </p>
            <img
              src="images/deliver.jpg"
              alt="Delivery service"
              className="rounded-xl shadow-lg w-full object-cover"
            />
          </div>

          {/* Contact Section */}
          <div className="bg-gray-50 rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Contact Us</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">TOOTA INC</h3>
                <p className="text-gray-700 font-medium mb-1">Our Office</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Toota Headquarters<br />
                  123 Express Lane<br />
                  Delivery City, DX 45678<br />
                  Phone: (123) 456-7890<br />
                  Email: contact@fastdrop.com
                </p>
              </div>

              {/* Contact Form */}
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input type="text" id="name" className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" id="email" className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea id="message" rows="3" className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"></textarea>
                </div>
                <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                  Send Message
                </button>
              </form>
            </div>

            {/* Map Embed */}
            <div className="mt-6">
              <iframe
                title="FastDrop Location"
                className="w-full h-64 rounded-xl border-0"
                src="https://www.google.com/maps/embed?pb=!1m18..."
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 px-6 py-6 bg-black text-white w-full relative">
  
          {/* Footer Content */}
          <div className="flex flex-wrap items-center justify-start sm:justify-between max-w-6xl mx-auto px-4 mb-4">
            <div className="flex items-center space-x-2">
              <img src="images/logo.png" alt="Toota Logo" className="w-13 h-13" />
              <span className="text-orange-400 font-bold text-lg">Toota</span>
            </div>

            <div className="flex flex-wrap justify-start sm:justify-end gap-4 mt-4 sm:mt-0 text-sm">
              <a href="#" className="text-black hover:text-orange-400">Pricing</a>
              <a href="#" className="text-black hover:text-orange-400">About Us</a>
              <a href="#" className="text-black hover:text-orange-400">Help Center</a>
              <a href="#" className="text-black hover:text-orange-400">Contact Us</a>
              <a href="#" className="text-black hover:text-orange-400">FAQs</a>
              <a href="#" className="text-black hover:text-orange-400">Careers</a>
            </div>
          </div>

          <hr className="border-gray-600 mb-4 mx-4" />

          <p className="text-sm text-center">&copy; {new Date().getFullYear()} Toota Inc. All rights reserved.</p>
        </footer>
      </section>
    </div>
  );
};

export default About;
