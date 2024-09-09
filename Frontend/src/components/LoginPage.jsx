import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic
    console.log('Login:', email, password);
    navigate('/dashboard/book-ride'); // Redirect to dashboard after login
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
        <div className="bg-blue-500 text-white py-4 px-6 rounded-t-lg">
          <h2 className="text-2xl font-bold text-center">Login to CampusCabs</h2>
        </div>
        <form onSubmit={handleLogin} className="p-8">
          <div className="mb-5">
            <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">Student Email <span className="text-red-500">*</span></label>
            <input 
              type="email" 
              id="email" 
              placeholder="Enter Student Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-1">Password <span className="text-red-500">*</span></label>
            <input 
              type="password" 
              id="password" 
              placeholder="Enter Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
