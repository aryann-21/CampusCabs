import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white text-center py-4 mt-auto">
      <p className="text-sm">&copy; 2024 CampusCabs. All rights reserved.</p>
      <div className="flex justify-center space-x-4 mt-2">
        {/* <Link to="/" className="text-white hover:underline">About Us</Link> */}
        <Link to="/contact" className="text-white hover:underline">Contact</Link>
      </div>
    </footer>
  );
};

export default Footer;
