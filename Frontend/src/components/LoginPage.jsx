import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import bgImg from "../assets/login.png"; // Use the same background image

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic
    console.log("Login:", email, password);
    navigate("/dashboard/book-ride"); // Redirect to dashboard after login
  };

  return (
    <div className="relative h-screen">
      <div
        className="absolute inset-0 bg-repeat-x bg-center"
        style={{
          backgroundImage: `url(${bgImg})`,
          backgroundSize: "auto 100%",
        }}
      ></div>

      {/* Navigation Arrow */}
      <span className="z-10 absolute left-10 top-10 transform -translate-y-1/2 text-gray-100">
        <Link to="/" className="material-icons text-3xl">
          arrow_back
        </Link>
      </span>

      <div className="absolute inset-0 flex items-center justify-center h-full bg-black bg-opacity-50">
        <div className="bg-gray-300 rounded-xl shadow-lg max-w-md w-full bg-opacity-50 backdrop-blur-sm">
          <div className="bg-gray-800 text-yellow-300 py-6 px-8 rounded-t-xl">
            <h2 className="text-3xl font-bold text-center">
              Login to CampusCabs
            </h2>
          </div>
          <form onSubmit={handleLogin} className="p-8 space-y-6">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-900 text-sm font-medium mb-2"
              >
                Student Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter Student Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-none focus:outline-none focus:ring-2 focus:ring-gray-800 transition duration-150 ease-in-out"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-900 text-sm font-medium mb-2"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-none focus:outline-none focus:ring-2 focus:ring-gray-800 transition duration-150 ease-in-out"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full text-xl bg-gray-800 text-yellow-300 py-3 rounded-lg font-semibold hover:bg-yellow-400 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 transition duration-300 ease-in-out"
            >
              Login
            </button>
          </form>
          <div className="px-8 pb-6 text-center">
            <p className="text-sm text-gray-950">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
