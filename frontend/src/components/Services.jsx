import React, { useState } from "react";
import { FaArrowRight, FaStar, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const servicesList = [
  {
    icon: <img src="../Images/send parcels.png" alt="Parcel Delivery" className="w-24 h-24 object-cover rounded-lg" />,
    title: (
      <span className="flex items-center gap-2 text-orange-500">
        Parcel Delivery <FaArrowRight />
      </span>
    ),
    description: "Courier service for urgent deliveries.",
  },
  {
    icon: <img src="../Images/one.png" alt="Furniture Moving" className="w-24 h-24 object-cover rounded-lg" />,
    title: (
      <span className="flex items-center gap-2 text-orange-500">
        Furniture Moving <FaArrowRight />
      </span>
    ),
    description: "Move large goods and furniture safely with our trusted service.",
  },
  {
    icon: <img src="../Images/Calend.png" alt="Scheduled Delivery" className="w-24 h-24 object-cover rounded-lg" />,
    title: (
      <span className="flex items-center gap-2 text-orange-500">
        Scheduled Delivery <FaArrowRight />
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
    image: "../Images/cb.jpg",
  },
  {
    name: "James Rodriguez",
    review: "Great experience! The team was friendly and handled my furniture with care.",
    rating: 4,
    image: "../Images/white.jpg",
  },
  {
    name: "Karabo Augustina Matlabe",
    review: "Scheduled delivery was seamless and on time. Highly recommend!",
    rating: 5,
    image: "../Images/baby.jpg",
  },
];

const Services = () => {
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState("en");
  const navigate = useNavigate();

  const handleSubscribe = () => {
    alert(`Thank you for subscribing, ${email}!`);
    setEmail("");
  };

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="services-container text-center px-4 py-10 bg-white flex flex-col">
      {/* Back Button */}
      <button 
        onClick={handleBack}
        className="self-start flex items-center text-orange-500 hover:text-orange-600 mb-6"
      >
        <FaArrowLeft className="mr-2" />
        Back
      </button>

      <h2 className="text-3xl sm:text-4xl font-bold text-orange-500 mb-6">Our Services</h2>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicesList.map((service, index) => (
          <div
            key={index}
            className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center"
          >
            {service.icon}
            <h3 className="text-xl font-semibold mt-3">{service.title}</h3>
            <p className="text-gray-600 mt-2">{service.description}</p>
          </div>
        ))}
      </div>

      {/* Customer Reviews Section */}
      <h2 className="text-3xl font-bold text-orange-500 mt-12">What Our Customers Say</h2>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {customerReviews.map((review, index) => (
          <div
            key={index}
            className="bg-gray-100 p-6 rounded-lg shadow-md text-center"
          >
            <img
              src={review.image}
              alt={review.name}
              className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
            />
            <h3 className="text-lg font-semibold text-black">{review.name}</h3>
            <p className="text-gray-600 mt-2">{review.review}</p>
            <div className="mt-2 flex justify-center">
              {Array(review.rating)
                .fill()
                .map((_, i) => (
                  <FaStar key={i} className="text-orange-500" />
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-100 text-black text-center p-6 mt-12 relative">
        <div className="max-w-5xl mx-auto flex flex-col items-center space-y-6">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <img src="../Images/logo.png" alt="Toota Logo" className="w-12 h-12" />
            <h2 className="text-2xl font-bold">Toota</h2>
          </div>
          {/* Navigation Links */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm text-left w-full justify-items-center">
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

          {/* Bottom Row: Language + Socials */}
          <div className="flex flex-col sm:flex-row justify-between items-center w-full mt-6 text-sm">
            <div className="mb-4 sm:mb-0">
              <label htmlFor="language" className="font-semibold mr-2">🌍 Language:</label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-gray-200 p-1 rounded border border-gray-400"
              >
                <option value="en">English</option>
                <option value="is">Isizulu</option>
                <option value="se">Sesotho</option>
                <option value="fr">French</option>
                <option value="af">Afrikaans</option>
              </select>
            </div>

            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-orange-500 hover:text-orange-600"><FaFacebookF size={20} /></a>
              <a href="https://twitter.com" className="text-orange-500 hover:text-orange-600"><FaTwitter size={20} /></a>
              <a href="https://instagram.com" className="text-orange-500 hover:text-orange-600"><FaInstagram size={20} /></a>
              <a href="https://linkedin.com" className="text-orange-500 hover:text-orange-600"><FaLinkedinIn size={20} /></a>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="mt-6 text-sm">
            &copy; 2025 Toota, Inc. | <a href="#" className="hover:text-orange-500">Privacy</a> | <a href="#" className="hover:text-orange-500">Terms</a> | <a href="#" className="hover:text-orange-500">Sitemap</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Services;