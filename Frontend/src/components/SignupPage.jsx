import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // Handle sign-up logic
    console.log('Signup:', name, email, password, phone);
    navigate('/dashboard/book-ride'); // Redirect to dashboard after signup
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full">
        <div className="bg-gray-800 text-yellow-300 py-6 px-8 rounded-t-xl">
          <h2 className="text-3xl font-bold text-center">Sign Up for CampusCabs</h2>
        </div>
        <form onSubmit={handleSignup} className="p-8 space-y-6">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              id="name" 
              placeholder="Enter Full Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-none focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-150 ease-in-out"
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
              Student Email <span className="text-red-500">*</span>
            </label>
            <input 
              type="email" 
              id="email" 
              placeholder="Enter Student Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-none focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-150 ease-in-out"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
              Password <span className="text-red-500">*</span>
            </label>
            <input 
              type="password" 
              id="password" 
              placeholder="Enter Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-none focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-150 ease-in-out"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 text-sm font-medium mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              id="phone" 
              placeholder="Enter Phone Number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-none focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-150 ease-in-out"
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
            />
          </div>
          <button type="submit" className="w-full text-xl bg-gray-800 text-yellow-300 py-3 rounded-lg font-semibold hover:bg-yellow-400 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-200 ease-in-out">
            Sign Up
          </button>
        </form>
        <div className="px-8 pb-6 text-center">
          <p className="text-sm text-gray-500">Already have an account? <Link to="/login" className="text-yellow-500 hover:underline">Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
