import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="bg-blue-500 text-white py-20 text-center">
      <h1 className="text-5xl font-bold mb-4">Welcome to CampusCabs</h1>
      <p className="text-lg mb-8">Convenient and affordable auto rides for our NITJ campus!</p>
      <div className="space-x-4">
        <Link to="/login">
          <button className="bg-white text-black py-2 px-6 rounded-full text-lg font-semibold hover:bg-slate-200">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="bg-black text-white py-2 px-6 rounded-full text-lg font-semibold hover:bg-gray-800">
            Sign Up
          </button>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
