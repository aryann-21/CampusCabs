import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios"; // Make sure Axios is imported for the POST request
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "../context/UserContext";

const ConfirmRidePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { user } = useUser(); // Access user from context

  // Destructure ride from location.state with fallback
  const { ride = {} } = location.state || {};

  const handleConfirm = async () => {
    if (!ride) {
      toast.error("Missing ride details.");
      return;
    }

    try {
      // Save ride history to the backend
      const rideHistoryResponse = await saveRideHistory();

      if (rideHistoryResponse) {
        if (user?.isGuest) {
          toast.success("Ride confirmed! (Guest mode - ride history not saved)");
        } else {
          toast.success("Ride confirmed and added to your history!");
        }

        // Navigate to ride history page after confirmation
        navigate("/dashboard/ride-history", {
          state: {
            rideBooked: true,
          },
        });
      }
    } catch (error) {
      console.error("Error confirming ride:", error);
      toast.error("Error confirming ride");
    }
  };

  // Function to save ride history
  const saveRideHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      
      const rideHistoryResponse = await axios.post("http://localhost:5000/save-ride-history", {
        dropLocation: ride.dropLocation,
        date: ride.date,
        time: ride.time,
        payment: ride.fare * ride.numberOfPeople,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (rideHistoryResponse.status === 200) {
        console.log("Ride history updated:", rideHistoryResponse.data);
        return true;
      } else {
        console.error("Failed to update ride history");
        toast.error("Failed to update ride history");
        return false;
      }
    } catch (error) {
      console.error("Error saving ride history:", error);
      toast.error("Error saving ride history");
      return false;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto mt-10">
      <ToastContainer />
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Confirm Your Ride
      </h2>
      
      {user?.isGuest && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-center">
          <p className="text-blue-800 text-sm">
            🎉 <strong>Guest Mode:</strong> You can confirm rides to see the booking process, but they won't be saved to your history.
          </p>
        </div>
      )}
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
            <p className="text-green-600">
              Rs {ride.fare * ride.numberOfPeople}/-
            </p>
          </div>
        </div>

        {/* Right Column - Ride Details */}
        <div className="w-full md:w-1/2 p-4 space-y-4">
          <div className="px-4 py-2 bg-gray-100 rounded-md shadow-sm">
            <p className="font-semibold text-gray-900">Availability:</p>
            <p
              className={`text-gray-900 ${
                ride.isAvailable ? "text-green-600" : "text-red-600"
              }`}
            >
              {ride.isAvailable ? "YES" : "NO"}
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
