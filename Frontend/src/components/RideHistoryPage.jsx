import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RideHistoryPage = ({ rideHistory = [] }) => {
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      toast.success('Your ride has been comfirmed!', {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        style: { backgroundColor: '#d4edda', color: '#155724' }
      });
    }
  }, [location.state]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <ToastContainer />
      <h2 className="text-2xl font-semibold mb-4">Ride History</h2>
      {/* List of past rides */}
      {rideHistory.length > 0 ? (
        <ul className="space-y-4">
          {rideHistory.map((ride, index) => (
            <li key={index} className="bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200 hover:-translate-y-1 duration-150">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600">Drop Location: {ride.dropLocation}</p>
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