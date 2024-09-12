// src/pages/BookRidePage.js
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import taxiImg from "../assets/taxi.jpg";
import { locations } from '../data/locations'; // Import locations data

const BookRidePage = ({ studentName = "Aryan", onFilterRides }) => {
  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropLocation: '',
    date: '',
    time: '',
    numberOfPeople: ''
  });
  const [selectedFare, setSelectedFare] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'dropLocation') {
      const fare = locations.find(loc => loc.name === value)?.fare || null;
      setSelectedFare(fare);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterRides(formData);
    navigate('/dashboard/filtered-rides', { state: { filters: { ...formData, fare: selectedFare } } });
  };

  return (
    <div className="flex h-[100%] overflow-hidden bg-white">
      {/* Left side - Booking form */}
      <div className="w-full md:w-1/2 p-4 md:p-6 flex flex-col justify-center items-center">
        <h1 className="text-gray-800 text-xl md:text-3xl font-semibold mb-2 text-center">
          Welcome, {studentName}!
        </h1>
        <h2 className="text-gray-800 text-2xl md:text-3xl font-bold mb-4 text-center">
          Go anywhere with CampusCabs
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Request a ride, hop in, and go.
        </p>
        <form onSubmit={handleSubmit} className="space-y-3 w-full max-w-sm">
          <div className="relative">
            <select
              name="dropLocation"
              value={formData.dropLocation}
              onChange={handleChange}
              required
              className="w-full bg-gray-100 border-2 border-gray-500 text-black py-2 px-3 rounded-md pl-12"
            >
              <option value="">Select drop location</option>
              {locations.map((loc, index) => (
                <option key={index} value={loc.name}>
                  {loc.name}
                </option>
              ))}
            </select>
            <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">
              <span className="material-icons">flag</span>
            </span>
          </div>
          <div className="relative">
            <input
              type="number"
              name="numberOfPeople"
              placeholder="Number of people"
              value={formData.numberOfPeople}
              onChange={handleChange}
              required
              className="w-full bg-gray-100 border-2 border-gray-500 text-black py-2 px-3 rounded-md pl-12"
            />
            <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">
              <span className="material-icons">people</span>
            </span>
          </div>
          <div className="relative">
            <input
              type="time"
              name="time"
              placeholder="Pickup time"
              value={formData.time}
              onChange={handleChange}
              required
              className="w-full bg-gray-100 border-2 border-gray-500 text-black py-2 px-3 rounded-md pl-12"
            />
            <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">
              <span className="material-icons">access_time</span>
            </span>
          </div>
          <div className="relative">
            <input
              type="date"
              name="date"
              placeholder="Date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full bg-gray-100 border-2 border-gray-500 text-black py-2 px-3 rounded-md pl-12"
            />
            <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">
              <span className="material-icons">event</span>
            </span>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-yellow-300 text-lg text-black font-bold py-2 px-10 rounded-md mt-4 hover:bg-yellow-400 transition duration-150"
            >
              See rides
            </button>
          </div>
        </form>
      </div>

      {/* Right side - Image */}
      <div
        className="hidden md:block w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${taxiImg})` }}
      >
        {/* This is where the actual image would go */}
      </div>
    </div>
  );
};

export default BookRidePage;
