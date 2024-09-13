// AboutUsSection.jsx
import React from 'react';
import bgImg from '../assets/aboutus.png';

const AboutUsSection = () => {
  return (
    <section className="about-us bg-gray-100 py-12">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <div className="image-card bg-white p-4 rounded-lg shadow-lg w-fit mx-auto">
            <img
              src={bgImg} // Replace with the path to your image
              alt="About Us"
              className="size-96 object-cover rounded-lg"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 px-4">
          <h2 className="text-2xl font-bold mb-4">About Us</h2>
          <p className="text-gray-700 leading-relaxed">
            Auto Rickshaws connect millions of people all over India. But the whole process is a time-consuming hassle—finding a driver and haggling over prices. Our priority is to innovate on the existing system to make it far more efficient and effective.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            We understand the frustration of waiting for an auto and the uncertainty of negotiating fares. That’s why we’ve created CampusCabs. Our app simplifies the process by connecting you with nearby auto rickshaws instantly. With just a few taps, you can book a ride, coordinate with others, and plan your trips in advance.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4 font-bold">
            The real question is, why haven’t you signed up yet?
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
