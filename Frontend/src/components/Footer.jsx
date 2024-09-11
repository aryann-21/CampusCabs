import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        {/* Top Section: Logo, Links, and Social Media */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-700 pb-8 mb-8">
          {/* Logo and Description */}
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h2 className="text-3xl font-bold">
              Campus<span className="text-yellow-400">Cabs</span>
            </h2>
            <p className="text-sm mt-2">
              Your reliable campus transportation service.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-6 mb-6 md:mb-0">
            <Link to="/" className="text-white hover:text-yellow-400 transition">
              Home
            </Link>
            <Link
              to="/"
              className="text-white hover:text-yellow-400 transition"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-white hover:text-yellow-400 transition"
            >
              Contact
            </Link>
            <Link
              to="/"
              className="text-white hover:text-yellow-400 transition"
            >
              Blogs
            </Link>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-yellow-400 transition"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-yellow-400 transition"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-yellow-400 transition"
            >
              <FaInstagram size={24} />
            </a>
          </div>
        </div>

        {/* Middle Section: Additional Links */}
        <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-4 gap-8">
          {/* Help Center */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Help Center</h3>
            <div className="block text-sm text-gray-400 hover:text-yellow-400 transition">
              Visit Help Center
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Company</h3>
            <div className="block text-sm text-gray-400 hover:text-yellow-400 transition">About Us</div>
            <div className="block text-sm text-gray-400 hover:text-yellow-400 transition">Collaborators</div>
          </div>

          {/* Our Offerings */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Our Offerings</h3>
            <div className="block text-sm text-gray-400 hover:text-yellow-400 transition">Ride</div>
            <div className="block text-sm text-gray-400 hover:text-yellow-400 transition">Drive</div>
            <div className="block text-sm text-gray-400 hover:text-yellow-400 transition">CampusCabs for Business</div>
            <div className="block text-sm text-gray-400 hover:text-yellow-400 transition">Gift Cards</div>
          </div>

          {/* Travel */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Travel</h3>
            <div className="block text-sm text-gray-400 hover:text-yellow-400 transition">Reserve</div>
            <div className="block text-sm text-gray-400 hover:text-yellow-400 transition">Bus Stands</div>
            <div className="block text-sm text-gray-400 hover:text-yellow-400 transition">Stations</div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center mt-14 -mb-10">
          <p className="text-gray-400 text-sm">
            &copy; 2024 CampusCabs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
