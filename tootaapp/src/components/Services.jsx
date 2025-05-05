import React, { useState } from "react";
import { FaArrowRight, FaStar } from "react-icons/fa"; 
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";


const servicesList = [
  {
    icon: <img src="public/images/send parcels.png" alt="Parcel Delivery" className="w-32 h-32 object-cover rounded-lg" />,
    title: (
      <span className="flex items-center gap-2 text-orange-500">
        Parcel Delivery <FaArrowRight className="text-orange-500" />
      </span>
    ),
    description: "Courier service for urgent deliveries.",
  },
  {
    icon: <img src="public/images/one.png" alt="Furniture Moving" className="w-34 h-34 object-cover rounded-lg" />,
    title: (
      <span className="flex items-center gap-2 text-orange-500">
        Furniture Moving <FaArrowRight className="text-orange-500" />
      </span>
    ),
    description: "Move large goods and furniture safely with our trusted service.",
  },
  {
    icon: <img src="public/images/calend.png" alt="Scheduled Delivery" className="w-32 h-32 object-cover rounded-lg" />,
    title: (
      <span className="flex items-center gap-2 text-orange-500">
        Scheduled Delivery <FaArrowRight className="text-orange-500" />
      </span>
    ),
    description: "Plan and organize your deliveries in advance.",
  },
];

const customerReviews = [
  {
    name: "Emily Watson",
    review: "Fast and reliable service! My package arrived earlier than expected.",
    rating: 5,
    image: "public/images/cb.jpg",
  },
  {
    name: "James Rodriguez",
    review: "Great experience! The team was friendly and handled my furniture with care.",
    rating: 4,
    image: "public/images/white.jpg",
  },
  {
    name: "Karabo Augustina Matlabe",
    review: "Scheduled delivery was seamless and on time. Highly recommend!",
    rating: 5,
    image: "public/images/baby.jpg",
  },
];

const Services = () => {
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState("en");

  const handleSubscribe = () => {
    alert(`Thank you for subscribing, ${email}!`);
    setEmail(""); // Clear input after submission
  };

  return (
    <div className="services-container text-center p-10 bg-white min-h-screen flex flex-col">
      <h2 className="text-4xl font-bold text-orange-500 mb-6">Our Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-grow">
        {servicesList.map((service, index) => (
          <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center justify-between text-center">
            <span>{service.icon}</span>
            <h3 className="text-xl font-semibold mt-3">{service.title}</h3>
            <p className="text-gray-600 mt-2">{service.description}</p>
          </div>
        ))}
      </div>

      {/* Customer Reviews Section */}
      <h2 className="text-3xl font-bold text-orange-500 mt-12">What Our Customers Say</h2>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {customerReviews.map((review, index) => (
          <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
            <img src={review.image} alt={review.name} className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"/>
            <h3 className="text-lg font-semibold text-black">{review.name}</h3>
            <p className="text-gray-600 mt-2">{review.review}</p>
            <div className="mt-2 flex justify-center">
              {Array(review.rating).fill().map((_, i) => (
                <FaStar key={i} className="text-orange-500" />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Section */}
<footer className="bg-gray-100 text-black text-center p-6 mt-12 relative">
  <div className="max-w-4xl mx-auto flex flex-col items-center">
    {/* Logo and Title */}
    <div className="flex items-center justify-center space-x-3 mb-4">
      <img src="public/images/logo.png" alt="Toota Logo" className="w-17 h-17 object-cover"/>
      <h2 className="text-2xl font-bold text-black">Toota</h2> 
    </div>

    {/* Newsletter Subscription */}
    <p className="text-lg font-semibold text-black">Subscribe to our newsletter</p>
    <div className="mt-4 flex items-center justify-center space-x-2">
      <input 
        type="email" 
        placeholder="Enter your email..." 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 text-black rounded w-60 outline-none border border-orange-500"
      />
      <button 
        onClick={handleSubscribe}
        className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
      >
        Subscribe
      </button>
    </div>

    {/* Footer Navigation Links */}
    <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm">
      <div>
        <h3 className="font-bold">Product</h3>
        <ul className="mt-2 space-y-1">
          <li><a href="#" className="hover:text-orange-500">Features</a></li>
          <li><a href="#" className="hover:text-orange-500">Pricing</a></li>
        </ul>
      </div>
      <div>
        <h3 className="font-bold">Resource</h3>
        <ul className="mt-2 space-y-1">
          <li><a href="#" className="hover:text-orange-500">Blog</a></li>
          <li><a href="#" className="hover:text-orange-500">User guides</a></li>
        </ul>
      </div>
      <div>
        <h3 className="font-bold">Company</h3>
        <ul className="mt-2 space-y-1">
          <li><a href="#" className="hover:text-orange-500">About us</a></li>
          <li><a href="#" className="hover:text-orange-500">Contact us</a></li>
        </ul>
      </div>
      <div>
        <h3 className="font-bold">Plans & Pricing</h3>
        <ul className="mt-2 space-y-1">
          <li><a href="#" className="hover:text-orange-500">Start up</a></li>
          <li><a href="#" className="hover:text-orange-500">Organization</a></li>
        </ul>
      </div>
    </div>

    {/* Language Selection at Bottom Left */}
    <div className="absolute bottom-4 left-4 text-sm">
      <label htmlFor="language" className="font-semibold">🌍 Language: </label>
      <select id="language" value={language} onChange={(e) => setLanguage(e.target.value)} className="bg-gray-200 text-black p-1 rounded border border-gray-400">
        <option value="en">English</option>
        <option value="is">Isizulu</option>
        <option value="se">Sesotho</option>
        <option value="fr">French</option>
        <option value="af">Afrikaans</option>
      </select>
    </div>

    {/* Social Media Icons at Bottom Right */}
    <div className="absolute bottom-4 right-4 flex space-x-4">
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-600">
        <FaFacebookF size={24} />
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-600">
        <FaTwitter size={24} />
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-600">
        <FaInstagram size={24} />
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-600">
        <FaLinkedinIn size={24} />
      </a>
    </div>

    {/* Copyright + Legal Links */}
    <div className="mt-6 text-sm">
      &copy; 2025 Brand, Inc. | <a href="#" className="hover:text-orange-500">Privacy</a> | <a href="#" className="hover:text-orange-500">Terms</a> | <a href="#" className="hover:text-orange-500">Sitemap</a>
    </div>
  </div>
</footer>

    </div>
  );
};

export default Services;