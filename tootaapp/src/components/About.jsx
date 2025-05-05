import { Link } from "react-router-dom";
import Navbar from "../components/Navbar"; // Adjust the path as needed

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Use the Navbar component */}
      <Navbar />

      {/* About Us Section */}
      <section className="bg-white py-16 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          {/* About Section */}
          <div className="space-y-6">
            <h4 className="text-4xl font-bold text-gray-800">About Us</h4>
            <p className="text-gray-600 text-lg">
              Welcome to <span className="text-orange-500 font-semibold">Toota</span> — your trusted partner for fast, safe, and reliable deliveries. Whether it's a quick lunch or a thoughtful gift, we've got you covered.
            </p>
            <h3 className="text-4xl font-bold text-gray-800">Mission & Vision</h3>
            <p className="text-gray-600 text-lg">
              We're committed to making delivery efficient and friendly. With real-time tracking and customer-first service, you're always informed and in control.
            </p>
            <h3 className="text-4xl font-bold text-gray-800">Services We Offer</h3>
            <p className="text-gray-600 text-lg">
              Same day delivery, Express delivery, E-commerce logistics, International Shipping
            </p>
            <img
              src="public/images/deliver.jpg"
              alt="Delivery service"
              className="rounded-xl shadow-lg w-full object-cover"
            />
          </div>

          {/* Contact Section */}
          <div className="bg-gray-50 rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Contact Us</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Address */}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">Name</label>
                  <input type="text" id="name" className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email</label>
                  <input type="email" id="email" className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="message">Message</label>
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
        <footer className="mt-16 px-6 py-6 bg-black text-white w-full relative">
       <h4 className="text-lg font-semibold text-center mb-4">Subscribe to our email newsletter</h4>

      <form className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-6 max-w-xl mx-auto">
     <input
        type="email"
        placeholder="Enter your email"
        className="w-full sm:w-auto flex-1 px-4 py-2 rounded-lg bg-white border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
        required
     />
      <button
      type="submit"
      className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition"
      >
       Subscribe
      </button>
    </form>

      {/* Footer Links and Logo Row */}
      <div className="flex flex-wrap items-center justify-start sm:justify-between max-w-6xl mx-auto px-4 mb-4">
      {/* Logo + Toota */}
      <div className="flex items-center space-x-2">
      <img src="public/images/logo.png" alt="Toota Logo" className="w-13 h-13" />
      <span className="text-orange-400 font-bold text-lg">Toota</span>
      </div>

       {/* Footer Links */}
       <div className="flex flex-wrap justify-start sm:justify-end gap-4 mt-4 sm:mt-0 text-sm">
        <a href="#" className="text-black hover:text-orange-400">Pricing</a>
        <a href="#" className="text-black hover:text-orange-400">About Us</a>
        <a href="#" className="text-black hover:text-orange-400">Help Center</a>
        <a href="#" className="text-black hover:text-orange-400">Contact Us</a>
        <a href="#" className="text-black hover:text-orange-400">FAQs</a>
        <a href="#" className="text-black hover:text-orange-400">Careers</a>
        </div>
        </div>

        {/* Line Separator */}
         <hr className="border-gray-600 mb-4 mx-4" />

          {/* Copyright */}
         <p className="text-sm text-center">&copy; {new Date().getFullYear()} Toota Inc. All rights reserved.</p>
       </footer>
      </section>
    </div>
  );
};

export default About;
