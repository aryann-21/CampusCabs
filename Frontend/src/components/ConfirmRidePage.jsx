// src/pages/ConfirmRidePage.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ConfirmRidePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { ride } = location.state;

  const handleConfirm = () => {
    // Handle ride confirmation logic here
    console.log('Ride confirmed:', ride);
    navigate('/dashboard/ride-history'); // Redirect to ride history or another page
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Confirm Your Ride</h2>
      <div className="flex flex-wrap justify-between mb-6 text-[17px]">
        {/* Left Column - Rider Details */}
        <div className="w-full md:w-1/2 p-4 space-y-4">
          <div className="px-4 py-2 bg-gray-100 rounded-md shadow-sm">
            <p className="font-semibold text-gray-900">Driver Name:</p>
            <p className="text-gray-800">{ride.driverName}</p>
          </div>
          <div className="px-4 py-2 bg-gray-100 rounded-md shadow-sm">
            <p className="font-semibold text-gray-900">Driver Phone:</p>
            <p className="text-gray-800">{ride.driverPhone}</p>
          </div>
          <div className="px-4 py-2 bg-gray-100 rounded-md shadow-sm">
            <p className="font-semibold text-gray-900">Cab Number:</p>
            <p className="text-gray-800">{ride.cabNumber}</p>
          </div>
          <div className="px-4 py-2 bg-gray-100 rounded-md shadow-sm">
            <p className="font-semibold text-gray-900">Available Seats:</p>
            <p className="text-gray-800">{ride.availableSeats}</p>
          </div>
          <div className="px-4 py-2 bg-gray-100 rounded-md shadow-sm">
            <p className="font-semibold text-gray-900">Total Fare:</p>
            <p className="text-green-600">Rs {ride.fare * ride.numberOfPeople}/-</p>
          </div>
        </div>

        {/* Right Column - Ride Details */}
        <div className="w-full md:w-1/2 p-4 space-y-4">
          <div className="px-4 py-2 bg-gray-100 rounded-md shadow-sm">
            <p className="font-semibold text-gray-900">Availability:</p>
            <p className={`text-gray8900 ${ride.isAvailable ? 'text-green-600' : 'text-red-600'}`}>
              {ride.isAvailable ? 'YES' : 'NO'}
            </p>
          </div>
          <div className="px-4 py-2 bg-gray-100 rounded-md shadow-sm">
            <p className="font-semibold text-gray-900">Drop Location:</p>
            <p className="text-gray-800">{ride.dropLocation}</p>
          </div>
          <div className="px-4 py-2 bg-gray-100 rounded-md shadow-sm">
            <p className="font-semibold text-gray-900">Number of People:</p>
            <p className="text-gray-800">{ride.numberOfPeople}</p>
          </div>
          <div className="px-4 py-2 bg-gray-100 rounded-md shadow-sm">
            <p className="font-semibold text-gray-900">Pickup Time:</p>
            <p className="text-gray-800">{ride.time}</p>
          </div>
          <div className="px-4 py-2 bg-gray-100 rounded-md shadow-sm">
            <p className="font-semibold text-gray-900">Pickup Date:</p>
            <p className="text-gray-800">{ride.date}</p>
          </div>
        </div>
      </div>
      <div className="text-center">
        <button
          onClick={handleConfirm}
          className="bg-blue-500 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-150"
        >
          Confirm Ride
        </button>
      </div>
    </div>
  );
};

export default ConfirmRidePage;
