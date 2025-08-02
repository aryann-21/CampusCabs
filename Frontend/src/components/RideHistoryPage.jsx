import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "../context/UserContext";
import axios from "axios"; // Import axios for making API calls

const RideHistoryPage = () => {
  const location = useLocation();
  const [rideHistory, setRideHistory] = useState([]);
  const { user } = useUser(); // Access user from context

  useEffect(() => {
    // Fetch ride history from backend when the component loads and user is logged in
    if (user) {
      const fetchRideHistory = async () => {
        try {
          const token = localStorage.getItem('token');
          
          const response = await axios.get(
            'http://localhost:5000/ride-history',
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          
          const sortedHistory = response.data.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          ); // Sort the rides in descending order by date
          setRideHistory(sortedHistory); // Assuming the response returns an array of rides
        } catch (error) {
          console.error("Error fetching ride history:", error);
          if (user?.isGuest) {
            toast.info("Guest users don't have ride history. Create an account to save your rides!");
          } else {
            toast.error("Ride history missing. Please book a ride to view history.");
          }
        }
      };

      fetchRideHistory();
    }
  }, [user]); // Re-run when user changes

  useEffect(() => {
    // If there is a new ride passed from the ConfirmRidePage
    if (location.state && location.state.rideBooked) {
      toast.success("Your ride has been confirmed!", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        style: { backgroundColor: "#d4edda", color: "#155724" },
      });

      // Update the ride history with the new ride
      if (location.state.rideHistory) {
        const updatedHistory = location.state.rideHistory.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setRideHistory(updatedHistory);
      }
    }
  }, [location.state]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <ToastContainer />
      <h2 className="text-2xl font-semibold mb-4">Ride History</h2>
      
      {user?.isGuest && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-800 text-sm">
            👤 <strong>Guest Mode:</strong> Your ride history is not saved. Create an account to save your rides and access personalized features.
          </p>
        </div>
      )}

      {/* Display the ride history */}
      {rideHistory.length > 0 ? (
        <ul className="space-y-4">
          {rideHistory.map((ride, index) => (
            <li
              key={index}
              className="bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200 hover:-translate-y-1 duration-150"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600">
                    Drop Location: {ride.dropLocation}
                  </p>
                  <p className="text-gray-600">
                    Date:{" "}
                    {new Date(ride.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-gray-600">Time: {ride.time}</p>
                  <p className="text-gray-600">Payment: Rs {ride.payment}/-</p>
                </div>
                <span className="material-icons text-gray-500">
                  directions_car
                </span>
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
