import React, { useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import BookRidePage from "./BookRidePage";
import RideHistoryPage from "./RideHistoryPage";
import MessagesPage from "./MessagesPage";
import AvailableRidesPage from "./AvailableRidesPage";
import ConfirmRidePage from "./ConfirmRidePage"; // Import the new page
import { allRides } from "../data/allRides"; // Import allRides data
import { rideHistory } from "../data/rideHistory"; // Import rideHistory data
import { useUser } from "../context/UserContext"; // Import your UserContext
import axios from "axios"; // Import axios for making API calls

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("book-ride");
  const [filteredRides, setFilteredRides] = useState([]);
  const navigate = useNavigate();

  // Get user details from context
  const { user, logout } = useUser();
  const userEmail = user?.email; // Access the user's email

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleFilterRides = (filters) => {
    const filtered = allRides.filter(
      (ride) =>
        ride.isAvailable === true &&
        ride.availableSeats >= filters.numberOfPeople
    );
    setFilteredRides(filtered);
    navigate("/dashboard/filtered-rides", {
      state: {
        filteredRides: filtered,
        userEmail: userEmail, // Pass user's email here
      },
    });
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg p-6 flex flex-col justify-between">
        <div>
          {/* Logo/Header */}
          <div className="flex items-center mb-6">
            <span className="material-icons mr-3">dashboard</span>
            <h2 className="text-2xl font-bold">Dashboard</h2>
          </div>
          <ul>
            <li className="mb-4">
              <Link
                to="book-ride"
                onClick={() => setActiveTab("book-ride")}
                className={`w-full flex items-center text-left p-2 rounded-lg ${
                  activeTab === "book-ride"
                    ? "bg-blue-100 text-blue-500"
                    : "text-gray-700"
                } hover:bg-blue-50 hover:text-blue-500`}
              >
                <span className="material-icons mr-3">directions_car</span>
                Book a Ride
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="ride-history"
                onClick={() => setActiveTab("ride-history")}
                className={`w-full flex items-center text-left p-2 rounded-lg ${
                  activeTab === "ride-history"
                    ? "bg-blue-100 text-blue-500"
                    : "text-gray-700"
                } hover:bg-blue-50 hover:text-blue-500`}
              >
                <span className="material-icons mr-3">history</span>
                Ride History
              </Link>
            </li>
            {/* <li className="mb-4">
              <Link
                to="messages"
                onClick={() => setActiveTab("messages")}
                className={`w-full flex items-center text-left p-2 rounded-lg ${
                  activeTab === "messages"
                    ? "bg-blue-100 text-blue-500"
                    : "text-gray-700"
                } hover:bg-blue-50 hover:text-blue-500`}
              >
                <span className="material-icons mr-3">message</span>
                Messages
              </Link>
            </li> */}
            <li className="mb-4">
              <Link
                to="available-rides"
                onClick={() => setActiveTab("available-rides")}
                className={`w-full flex items-center text-left p-2 rounded-lg ${
                  activeTab === "available-rides"
                    ? "bg-blue-100 text-blue-500"
                    : "text-gray-700"
                } hover:bg-blue-50 hover:text-blue-500`}
              >
                <span className="material-icons mr-3">directions_car</span>
                All Rides
              </Link>
            </li>
          </ul>
        </div>
        {/* Footer with User Info */}
        <div className="mt-6">
          {/* User Information */}
          <div className="bg-gray-50 rounded-lg p-2 mb-4">
            <div className="flex items-center space-x-3">
              {/* User Avatar */}
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center">
                {user?.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="material-icons text-gray-600 text-xl">
                    User
                  </span>
                )}
              </div>
              {/* User Details */}
              <div className="flex-1 min-w-0">
                <h3 className="text-xs font-semibold text-gray-900 truncate">
                  {user?.name || "User"}
                  {user?.isGuest && (
                    <span className="ml-1 text-xs bg-gray-200 text-gray-600 px-1 rounded">
                      Guest
                    </span>
                  )}
                </h3>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email || "user@example.com"}
                </p>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center bg-red-500 text-white hover:bg-red-600 transition-colors duration-200 py-2 px-4 rounded-lg text-sm font-medium"
          >
            <span className="material-icons mr-2 text-lg">logout</span>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-6 overflow-y-auto">
        {/* Tab Content */}
        <Routes>
          <Route
            path="book-ride"
            element={
              <BookRidePage
                onFilterRides={handleFilterRides}
                userEmail={userEmail}
              />
            }
          />
          <Route
            path="ride-history"
            element={
              <RideHistoryPage
                email={userEmail}
                rideHistory={user?.rideHistory}
              />
            }
          />
          <Route path="messages" element={<MessagesPage />} />
          <Route
            path="available-rides"
            element={<AvailableRidesPage allRides={allRides} />}
          />
          <Route
            path="filtered-rides"
            element={
              <AvailableRidesPage
                allRides={allRides}
                filteredRides={filteredRides}
              />
            }
          />
          <Route
            path="confirm-ride"
            element={<ConfirmRidePage userEmail={userEmail} />}
          />
        </Routes>
      </main>
    </div>
  );
};

export default DashboardPage;
