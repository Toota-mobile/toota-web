import React, { useState } from "react";
import { FaArrowRight, FaStar, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaTruck, FaBoxes, FaCalendarAlt } from "react-icons/fa";

const servicesList = [
  {
    icon: <FaTruck className="text-5xl text-orange-500" />,
    title: "Parcel Delivery",
    description: "Courier service for urgent deliveries with real-time tracking.",
    features: ["Same-day delivery", "Package tracking", "Secure handling"]
  },
  {
    icon: <FaBoxes className="text-5xl text-orange-500" />,
    title: "Furniture Moving",
    description: "Professional moving services for large items and furniture.",
    features: ["Careful handling", "Assembly service", "Protective packaging"]
  },
  {
    icon: <FaCalendarAlt className="text-5xl text-orange-500" />,
    title: "Scheduled Delivery",
    description: "Plan and organize your deliveries in advance.",
    features: ["Flexible scheduling", "Recurring deliveries", "Time windows"]
  }
];

const customerReviews = [
  {
    name: "Emily Watson",
    review: "Fast and reliable service! My package arrived earlier than expected.",
    rating: 5,
    location: "Johannesburg"
  },
  {
    name: "James Rodriguez",
    review: "Great experience! The team was friendly and handled my furniture with care.",
    rating: 4,
    location: "Cape Town"
  },
  {
    name: "Karabo Matlabe",
    review: "Scheduled delivery was seamless and on time. Highly recommend!",
    rating: 5,
    location: "Durban"
  }
];

const Services = () => {
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState("en");

  const handleSubscribe = () => {
    alert(`Thank you for subscribing with ${email}!`);
    setEmail("");
  };

  return (
    <div className="bg-white">
      {/* Services Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <span className="text-orange-500 font-semibold">OUR SERVICES</span>
          <h2 className="text-4xl font-bold text-gray-900 mt-4 mb-6">Delivery Solutions Tailored For You</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide reliable and efficient delivery services to meet all your shipping needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesList.map((service, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="mb-6">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-orange-500 mr-2 mt-1">•</span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className="flex items-center text-orange-500 font-medium hover:text-orange-600 transition">
                Learn more <FaArrowRight className="ml-2" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-orange-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-orange-500 font-semibold">TESTIMONIALS</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-4 mb-6">What Our Customers Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {customerReviews.map((review, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex mb-6">
                  {Array(review.rating).fill().map((_, i) => (
                    <FaStar key={i} className="text-orange-500" />
                  ))}
                </div>
                <p className="text-gray-700 text-lg italic mb-8">"{review.review}"</p>
                <div className="flex items-center">
                  <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center text-orange-500 font-bold mr-4">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{review.name}</h4>
                    <p className="text-gray-500">{review.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Ship With Confidence?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of satisfied customers who trust us with their deliveries
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-3 rounded-lg text-gray-900"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={handleSubscribe}
              className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-medium transition"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-white text-xl font-bold mb-6 flex items-center">
                <span className="bg-orange-500 text-white w-8 h-8 rounded flex items-center justify-center mr-2">T</span>
                Toota
              </h3>
              <p className="mb-6">Delivering excellence with every package across South Africa.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-orange-500 transition"><FaFacebookF /></a>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition"><FaTwitter /></a>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition"><FaInstagram /></a>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition"><FaLinkedinIn /></a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Services</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-orange-500 transition">Parcel Delivery</a></li>
                <li><a href="#" className="hover:text-orange-500 transition">Furniture Moving</a></li>
                <li><a href="#" className="hover:text-orange-500 transition">Scheduled Delivery</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-orange-500 transition">About Us</a></li>
                <li><a href="#" className="hover:text-orange-500 transition">Careers</a></li>
                <li><a href="#" className="hover:text-orange-500 transition">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Support</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-orange-500 transition">Help Center</a></li>
                <li><a href="#" className="hover:text-orange-500 transition">Track Order</a></li>
                <li>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="bg-gray-700 text-white px-3 py-2 rounded text-sm"
                  >
                    <option value="en">English</option>
                    <option value="is">IsiZulu</option>
                    <option value="se">Sesotho</option>
                    <option value="fr">French</option>
                    <option value="af">Afrikaans</option>
                  </select>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-sm">
            &copy; {new Date().getFullYear()} Toota Delivery. All rights reserved.
            <div className="mt-4">
              <a href="#" className="hover:text-orange-500 transition mx-2">Privacy Policy</a>
              <a href="#" className="hover:text-orange-500 transition mx-2">Terms of Service</a>
              <a href="#" className="hover:text-orange-500 transition mx-2">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Services;