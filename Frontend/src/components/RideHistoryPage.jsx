import React from 'react';

const RideHistoryPage = ({ rideHistory = [] }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Ride History</h2>
      {/* List of past rides */}
      {rideHistory.length > 0 ? (
        <ul className="space-y-4">
          {rideHistory.map((ride, index) => (
            <li key={index} className="bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200 hover:-translate-y-1 duration-150">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">From: NITJ</p>
                  <p className="font-semibold">To: {ride.dropLocation}</p>
                  <p className="text-gray-600">Date: {ride.date}</p>
                  <p className="text-gray-600">Time: {ride.time}</p>
                </div>
                <span className="material-icons text-gray-500">directions_car</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No ride history available.</p>
      )}
    </div>
  );
};

export default RideHistoryPage;