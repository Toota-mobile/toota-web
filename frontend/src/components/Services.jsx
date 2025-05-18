import React, { useState } from "react";
import { FaArrowRight, FaStar, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const servicesList = [
  {
    icon: <img src="../Images/send parcels.png" alt="Parcel Delivery" className="w-24 h-24 object-contain" />,
    title: "Parcel Delivery",
    description: "Courier service for urgent deliveries.",
  },
  {
    icon: <img src="../Images/one.png" alt="Furniture Moving" className="w-24 h-24 object-contain" />,
    title: "Furniture Moving",
    description: "Move large goods and furniture safely with our trusted service.",
  },
  {
    icon: <img src="../Images/Calend.png" alt="Scheduled Delivery" className="w-24 h-24 object-contain" />,
    title: "Scheduled Delivery",
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

  const handleSubscribe = () => {
    alert(`Thank you for subscribing, ${email}!`);
    setEmail("");
  };

  return (
    <div className="services-container px-6 py-12 bg-white">
      {/* Services Section */}
      <section className="max-w-7xl mx-auto mb-20">
        <h2 className="text-4xl font-bold text-orange-500 mb-4 text-center">Our Services</h2>
        <p className="text-gray-600 text-lg mb-16 text-center max-w-3xl mx-auto">
          We provide reliable and efficient delivery solutions tailored to your needs
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {servicesList.map((service, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col items-center text-center"
            >
              <div className="bg-orange-50 p-6 rounded-full mb-6">
                {service.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-3">
                {service.title} <FaArrowRight className="text-orange-500 text-xl" />
              </h3>
              <p className="text-gray-600 text-lg">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-orange-500 mb-16 text-center">Customer Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-6">
            {customerReviews.map((review, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-16 h-16 rounded-full object-cover mr-6"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800 text-xl">{review.name}</h3>
                    <div className="flex mt-2">
                      {Array(review.rating)
                        .fill()
                        .map((_, i) => (
                          <FaStar key={i} className="text-orange-500 text-lg" />
                        ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-lg italic">"{review.review}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-1">
              <div className="flex items-center mb-6">
                <img src="../Images/logo.png" alt="Toota Logo" className="w-12 h-12 mr-4" />
                <h2 className="text-2xl font-bold">Toota</h2>
              </div>
              <p className="text-gray-400 text-lg">
                Delivering excellence with every package.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold mb-6 text-xl">Product</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-orange-500 transition text-lg">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-500 transition text-lg">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-6 text-xl">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-orange-500 transition text-lg">About us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-500 transition text-lg">Contact us</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-6 text-xl">Connect</h3>
              <div className="flex space-x-6 mb-6">
                <a href="https://facebook.com" className="text-gray-400 hover:text-orange-500 transition text-2xl"><FaFacebookF /></a>
                <a href="https://twitter.com" className="text-gray-400 hover:text-orange-500 transition text-2xl"><FaTwitter /></a>
                <a href="https://instagram.com" className="text-gray-400 hover:text-orange-500 transition text-2xl"><FaInstagram /></a>
                <a href="https://linkedin.com" className="text-gray-400 hover:text-orange-500 transition text-2xl"><FaLinkedinIn /></a>
              </div>
              <div>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-gray-700 text-white p-3 rounded-lg text-lg w-full"
                >
                  <option value="en">English</option>
                  <option value="is">Isizulu</option>
                  <option value="se">Sesotho</option>
                  <option value="fr">French</option>
                  <option value="af">Afrikaans</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-lg">
            &copy; {new Date().getFullYear()} Toota, Inc. All rights reserved. | 
            <a href="#" className="hover:text-orange-500 transition ml-2">Privacy</a> | 
            <a href="#" className="hover:text-orange-500 transition ml-2">Terms</a> | 
            <a href="#" className="hover:text-orange-500 transition ml-2">Sitemap</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Services;