import React, { useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import BookRidePage from "./BookRidePage";
import RideHistoryPage from "./RideHistoryPage";
import MessagesPage from "./MessagesPage";
import ProfilePage from "./ProfilePage";
import AvailableRidesPage from "./AvailableRidesPage";
import ConfirmRidePage from "./ConfirmRidePage"; // Import the new page
import { allRides } from "../data/allRides"; // Import allRides data
import { rideHistory } from "../data/rideHistory"; // Import rideHistory data
import { useUser } from "../context/UserContext"; // Import your UserContext

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("book-ride");
  const [filteredRides, setFilteredRides] = useState([]);
  const navigate = useNavigate();
  
  // Get user details from context
  const { user } = useUser(); 
  const userEmail = user?.email; // Access the user's email

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
        userEmail: userEmail // Pass user's email here
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
            <li className="mb-4">
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
            </li>
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
            <li className="mb-4">
              <Link
                to="profile"
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center text-left p-2 rounded-lg ${
                  activeTab === "profile"
                    ? "bg-blue-100 text-blue-500"
                    : "text-gray-700"
                } hover:bg-blue-50 hover:text-blue-500`}
              >
                <span className="material-icons mr-3">person</span>
                User Profile
              </Link>
            </li>
          </ul>
        </div>
        {/* Footer */}
        <div className="mt-6">
          <ul>
            <li className="mb-4">
              <div
                
                onClick={() => setActiveTab("settings")}
                className={`w-full flex items-center text-left p-2 rounded-lg ${
                  activeTab === "settings"
                    ? "bg-blue-100 text-blue-500"
                    : "text-gray-700"
                } hover:bg-blue-50 hover:text-blue-500`}
              >
                <span className="material-icons mr-3">settings</span>
                Settings
              </div>
            </li>
            <Link className="mb-4" to="/">
              <button
                onClick={() => {
                  setUser(null);
                  console.log("Logout");
                }}
                className="flex items-center text-left bg-red-500 text-white hover:bg-red-700 duration-150 w-fit py-2 px-3 rounded-lg"
              >
                <span className="material-icons mr-3">logout</span>
                Logout
              </button>
            </Link>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-6 overflow-y-auto">
        {/* Tab Content */}
        <Routes>
          <Route
            path="book-ride"
            element={<BookRidePage onFilterRides={handleFilterRides} userEmail={userEmail} />}
          />
          <Route
            path="ride-history"
            element={<RideHistoryPage email={userEmail} rideHistory={user?.rideHistory} />}
          />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="profile" element={<ProfilePage />} />
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
          <Route path="confirm-ride" element={<ConfirmRidePage userEmail={userEmail} />} />
        </Routes>
      </main>
    </div>
  );
};

export default DashboardPage;
