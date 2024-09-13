import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import bgImg from "../assets/tukTuk1.jpg";
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
      top: featuresRef.current.offsetTop + 800, // Adjust this value to stop higher (e.g., 100px)
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Navigation */}
      <div className="fixed top-0 z-50 w-full flex items-center justify-between px-8 py-6 bg-gray-900 text-white text-[21px] shadow-md">
        {/* Left side - Logo */}
        <div className="text-4xl cursor-pointer font-semibold" onClick={scrollToTop}>
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
              className="border-[3px] border-yellow-500 text-yellow-500 px-5 py-2 rounded-full hover:bg-black duration-150"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/signup"
              className="border-[3px] border-blue-300 text-blue-300 px-5 py-2 rounded-full hover:bg-black hover:border-blue-400 hover:text-blue-400 duration-150"
            >
              Sign Up
            </Link>
          </li>
        </ul>
      </div>

      {/* Background Image */}
      <div className="bg-black">
        <div className="pt-1 flex overflow-hidden opacity-25">
          {/* Add padding to ensure content starts below the navbar */}
          <img src={bgImg} alt="" className="h-screen" />
          <img src={bgImg} alt="" className="h-screen" />
          <img src={bgImg} alt="" className="h-screen" />
        </div>
      </div>

      {/* Hero Content */}
      <div className="absolute inset-0 flex items-center justify-center text-center">
        <motion.div
          className="z-20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="text-8xl font-bold text-white">
            <motion.span
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut", delay: 0.5 }}
            >
              Campus
            </motion.span>
            <motion.span
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut", delay: 1 }}
              className="text-yellow-400"
            >
              Cabs
            </motion.span>
          </div>
          <div className="mt-6 text-3xl text-white">
            <Typewriter
              options={{
                strings: [
                  "Your Trusted Campus Ride Awaits",
                  "Enjoy student-friendly fares",
                  "Seamlessly Connect with Fellow Students",
                  "Prioritizing Safety in Every Ride"
                ],
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 30,
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div ref={featuresRef}>
        <FeaturesSection />
      </div>
    </>
  );
};

export default HeroSection;
