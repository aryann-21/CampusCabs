import React from "react";
import { Link } from "react-router-dom";
import bgImg from "../assets/auto.png";

const HeroSection = () => {
  return (
    <>
      {/* Background Image */}
      <img src={bgImg} alt="" />

      {/* Navigation */}
      <div className="absolute top-0 z-10 w-full flex items-center justify-between px-8 py-6 text-black font-semibold text-[21px]">
        {/* Left side - Logo */}
        <div className="text-4xl">Campus<span className="text-yellow-400">Cabs</span></div>

        {/* Right side - Navigation Links */}
        <ul className="flex space-x-8 items-center">
          <li>
            <Link to="/" className="hover:text-yellow-400 duration-200">Home</Link>
          </li>
          <li>
            <Link to="/" className="hover:text-yellow-400 duration-200">About Us</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-yellow-400 duration-200">Contact</Link>
          </li>
          <li>
            <Link
              to="/login"
              className="border-[3px] border-yellow-400 text-yellow-400 px-5 py-2 rounded-full hover:bg-white hover:text-black hover:border-black duration-500"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/signup"
              className="border-[3px] border-white text-white px-5 py-2 rounded-full hover:bg-white hover:text-black hover:border-black duration-500"
            >
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default HeroSection;
