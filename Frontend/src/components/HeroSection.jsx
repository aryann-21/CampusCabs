import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import bgImg from "../assets/tukTuk1.jpg";
import FeaturesSection from "./FeaturesSection";
import { useUser } from "../context/UserContext";
import GoogleLoginButton from "./GoogleLogin";
import GuestLoginButton from "./GuestLoginButton";

const HeroSection = () => {
  const featuresRef = useRef(null);
  const { user, logout } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      <div className="fixed top-0 z-50 w-full flex items-center justify-between px-4 md:px-8 py-4 md:py-6 bg-gray-900 text-white shadow-md">
        {/* Left side - Logo */}
        <div className="text-2xl md:text-4xl cursor-pointer font-semibold" onClick={scrollToTop}>
          Campus<span className="text-yellow-400">Cabs</span>
        </div>

        {/* Right side - Navigation Links */}
        <ul className="hidden md:flex space-x-4 lg:space-x-8 items-center">
          <li>
            <button
              onClick={scrollToTop}
              className="hover:text-yellow-400 duration-200 text-sm lg:text-base"
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={scrollToFeatures}
              className="hover:text-yellow-400 duration-200 text-sm lg:text-base"
            >
              About Us
            </button>
          </li>
          <li>
            <Link to="/contact" className="hover:text-yellow-400 duration-200 text-sm lg:text-base">
              Contact
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link
                  to="/dashboard/book-ride"
                  className="border-2 md:border-[3px] border-green-500 text-green-500 px-3 md:px-5 py-1 md:py-2 rounded-full hover:bg-black duration-150 text-xs md:text-sm"
                >
                  Book Ride
                </Link>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="border-2 md:border-[3px] border-red-500 text-red-500 px-3 md:px-5 py-1 md:py-2 rounded-full hover:bg-black duration-150 text-xs md:text-sm"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <div className="flex items-center space-x-2 lg:space-x-3">
                <GoogleLoginButton compact={true} />
                <GuestLoginButton compact={true} />
              </div>
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white hover:text-yellow-400 duration-200"
          >
            <span className="material-icons text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-gray-900 text-white md:hidden">
          <div className="px-4 py-4 space-y-4">
            <button
              onClick={() => { scrollToTop(); setMobileMenuOpen(false); }}
              className="block w-full text-left hover:text-yellow-400 duration-200 py-2"
            >
              Home
            </button>
            <button
              onClick={() => { scrollToFeatures(); setMobileMenuOpen(false); }}
              className="block w-full text-left hover:text-yellow-400 duration-200 py-2"
            >
              About Us
            </button>
            <Link 
              to="/contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left hover:text-yellow-400 duration-200 py-2"
            >
              Contact
            </Link>
            {user ? (
              <div className="space-y-2 pt-2 border-t border-gray-700">
                <Link
                  to="/dashboard/book-ride"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center border-2 border-green-500 text-green-500 px-4 py-2 rounded-full hover:bg-black duration-150"
                >
                  Book Ride
                </Link>
                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="block w-full text-center border-2 border-red-500 text-red-500 px-4 py-2 rounded-full hover:bg-black duration-150"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-2 pt-2 border-t border-gray-700">
                <div className="flex flex-col space-y-2">
                  <GoogleLoginButton compact={true} />
                  <GuestLoginButton compact={true} />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

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
          <div className="text-4xl md:text-6xl lg:text-8xl font-bold text-white">
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
          <div className="mt-4 md:mt-6 text-lg md:text-2xl lg:text-3xl text-white px-4">
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
