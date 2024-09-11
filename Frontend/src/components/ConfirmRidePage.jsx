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
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Confirm Ride</h2>
      <div className="mb-4">
        <p className="font-semibold">Driver Name: {ride.driverName}</p>
        <p className="font-semibold">Driver Phone: {ride.driverPhone}</p>
        <p className="font-semibold">Cab Number: {ride.cabNumber}</p>
        <p className="font-semibold">Available Seats: {ride.availableSeats}</p>
        <p className="font-semibold">Availability: {ride.isAvailable ? 'YES' : 'NO'}</p>
        <p className="font-semibold">Drop Location: {ride.dropLocation}</p>
        <p className="font-semibold">Number of People: {ride.numberOfPeople}</p>
        <p className="font-semibold">Time: {ride.time}</p>
        <p className="font-semibold">Date: {ride.date}</p>
      </div>
      <button
        onClick={handleConfirm}
        className="bg-blue-500 text-white font-bold py-2 px-10 rounded-md mt-4 hover:bg-blue-600 transition duration-150"
      >
        Confirm Ride
      </button>
    </div>
  );
};

export default ConfirmRidePage;