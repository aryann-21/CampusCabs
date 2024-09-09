import React from "react";
import { useLocation } from "react-router-dom";

const AvailableRidesPage = ({ allRides, filteredRides }) => {
  const location = useLocation();
  const ridesToDisplay = location.pathname.includes("filtered-rides")
    ? filteredRides
    : allRides;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Available Rides</h2>
      {ridesToDisplay.length > 0 ? (
        <ul className="space-y-4">
          {ridesToDisplay.map((ride, index) => (
            <li key={index} className="flex bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200 hover:-translate-y-1 duration-100">
              <div
                className={`w-1 rounded-l-lg ${
                  ride.isAvailable ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
              <div className="flex-1 pl-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">
                      Driver Name: {ride.driverName}
                    </p>
                    <p className="font-semibold">
                      Driver Phone: {ride.driverPhone}
                    </p>
                    <p className="font-semibold">
                      Cab Number: {ride.cabNumber}
                    </p>
                    <p className="font-semibold">
                      Available Seats: {ride.availableSeats}
                    </p>
                    <p className="font-semibold">
                      Availability: {ride.isAvailable ? "YES" : "NO"}
                    </p>
                  </div>
                  <span className="material-icons text-gray-500">
                    directions_car
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No rides available.</p>
      )}
    </div>
  );
};

export default AvailableRidesPage;
