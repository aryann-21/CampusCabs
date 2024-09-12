import React, { useRef } from "react";
import { Link } from "react-router-dom";
import bgImg from "../assets/auto.png";
import FeaturesSection from "./FeaturesSection";

const HeroSection = () => {
  const featuresRef = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToFeatures = () => {
    window.scrollTo({
      top: featuresRef.current.offsetTop - 100, // Adjust this value to stop higher (e.g., 100px)
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Navigation */}
      <div className="fixed top-0 z-10 w-full flex items-center justify-between px-8 py-6 bg-zinc-100 text-black font-semibold text-[21px] shadow-md">
        {/* Left side - Logo */}
        <div
          className="text-4xl cursor-pointer"
          onClick={scrollToTop}
        >
          Campus<span className="text-yellow-400">Cabs</span>
        </div>

        {/* Right side - Navigation Links */}
        <ul className="flex space-x-8 items-center">
          <li>
            <button
              onClick={scrollToTop}
              className="hover:text-yellow-400 duration-200"
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={scrollToFeatures}
              className="hover:text-yellow-400 duration-200"
            >
              About Us
            </button>
          </li>
          <li>
            <Link to="/contact" className="hover:text-yellow-400 duration-200">
              Contact
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="border-[3px] border-black text-black px-5 py-2 rounded-full hover:text-yellow-500 hover:border-yellow-500 duration-150"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/signup"
              className="border-[3px] border-black text-black px-5 py-2 rounded-full hover:text-blue-300 hover:border-blue-300 duration-150"
            >
              Sign Up
            </Link>
          </li>
        </ul>
      </div>

      {/* Background Image */}
      <div className="pt-1">
        {" "}
        {/* Add padding to ensure content starts below the navbar */}
        <img src={bgImg} alt="" className="w-full h-screen object-cover" />
      </div>

      {/* Features Section */}
      <div ref={featuresRef}>
        <FeaturesSection />
      </div>
    </>
  );
};

export default HeroSection;
