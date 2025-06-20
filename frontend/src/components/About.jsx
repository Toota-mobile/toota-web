import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaTruck, FaClock, FaShieldAlt, FaUsers } from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-500 to-orange-600 py-20 px-6 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Toota</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Revolutionizing logistics with the same convenience you expect from ride-sharing
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Our Story Section */}
        <section className="py-16 px-6 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
              <p className="text-gray-600 text-lg mb-4">
                Founded in 2023, <span className="text-orange-500 font-semibold">Toota</span> was born from a simple idea: 
                moving goods should be as easy as ordering a ride. We saw the inefficiencies in traditional logistics 
                and set out to create a smarter solution.
              </p>
              <p className="text-gray-600 text-lg mb-4">
                Today, we're proud to be South Africa's fastest-growing on-demand delivery platform, connecting 
                thousands of customers with reliable drivers every day.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                  <FaTruck className="text-orange-500 text-3xl mb-3" />
                  <h3 className="font-bold text-lg mb-2">50,000+ Deliveries</h3>
                  <p className="text-gray-600">Completed across our network</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                  <FaUsers className="text-orange-500 text-3xl mb-3" />
                  <h3 className="font-bold text-lg mb-2">500+ Drivers</h3>
                  <p className="text-gray-600">Trusted delivery professionals</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl">
              <img 
                src="/images/deliver.jpg" 
                alt="Toota delivery team" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-gray-100 py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaClock className="text-orange-500 text-2xl" />
                </div>
                <h3 className="font-bold text-xl mb-3">Speed</h3>
                <p className="text-gray-600">
                  We understand time is precious. Our platform ensures your items get where they need to be, fast.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaShieldAlt className="text-orange-500 text-2xl" />
                </div>
                <h3 className="font-bold text-xl mb-3">Reliability</h3>
                <p className="text-gray-600">
                  Every delivery is tracked and monitored to ensure your items arrive safely and on time.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaTruck className="text-orange-500 text-2xl" />
                </div>
                <h3 className="font-bold text-xl mb-3">Convenience</h3>
                <p className="text-gray-600">
                  Book a delivery in seconds through our app, with transparent pricing and real-time updates.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-6 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-800">Get in Touch</h2>
              <p className="text-gray-600 text-lg">
                Have questions about our service or want to partner with us? Our team is here to help.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <FaMapMarkerAlt className="text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Our Headquarters</h3>
                    <p className="text-gray-600">
                      123 Delivery Avenue<br />
                      Sandton, Johannesburg<br />
                      South Africa, 2196
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <FaPhone className="text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Call Us</h3>
                    <p className="text-gray-600">+27 11 123 4567</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <FaEnvelope className="text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Email Us</h3>
                    <p className="text-gray-600">hello@toota.co.za</p>
                  </div>
                </div>
              </div>
              
              <div className="rounded-xl overflow-hidden shadow-lg h-64">
                <iframe
                  title="Toota Location"
                  className="w-full h-full"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3580.041790424204!2d28.0539233150286!3d-26.19598698344132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e950c1e0c1e0c1f%3A0x1e950c1e0c1e0c1f!2sSandton!5e0!3m2!1sen!2sza!4v1620000000000!5m2!1sen!2sza"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500" 
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500" 
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500" 
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea 
                    id="message" 
                    rows="4" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Your message here..."
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
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <img src="/images/logo.png" alt="Toota Logo" className="w-10 h-10 mr-3" />
                <span className="text-orange-400 font-bold text-xl">Toota</span>
              </div>
              <p className="text-gray-400">
                Making logistics simple, fast, and reliable across South Africa.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-400 hover:text-orange-400 transition">About Us</Link></li>
                <li><Link to="/careers" className="text-gray-400 hover:text-orange-400 transition">Careers</Link></li>
                <li><Link to="/blog" className="text-gray-400 hover:text-orange-400 transition">Blog</Link></li>
                <li><Link to="/press" className="text-gray-400 hover:text-orange-400 transition">Press</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link to="/help" className="text-gray-400 hover:text-orange-400 transition">Help Center</Link></li>
                <li><Link to="/safety" className="text-gray-400 hover:text-orange-400 transition">Safety</Link></li>
                <li><Link to="/faq" className="text-gray-400 hover:text-orange-400 transition">FAQs</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-orange-400 transition">Contact Us</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/terms" className="text-gray-400 hover:text-orange-400 transition">Terms of Service</Link></li>
                <li><Link to="/privacy" className="text-gray-400 hover:text-orange-400 transition">Privacy Policy</Link></li>
                <li><Link to="/cookies" className="text-gray-400 hover:text-orange-400 transition">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <hr className="border-gray-700 my-8" />
          
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Toota Inc. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="#" className="text-gray-400 hover:text-orange-400">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link to="#" className="text-gray-400 hover:text-orange-400">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link to="#" className="text-gray-400 hover:text-orange-400">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;