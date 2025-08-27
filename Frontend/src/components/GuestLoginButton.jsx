import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const GuestLoginButton = ({ compact = false }) => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleGuestLogin = async () => {
    try {
      // Send request to guest login endpoint
      const response = await axios.post(`https://campuscabs-backend.vercel.app/api/auth/guest`);

      if (response.data.success) {
        // Clear any existing tokens first
        localStorage.removeItem('token');
        
        // Store user data in context
        setUser(response.data.user);
        
        // Store token in localStorage
        localStorage.setItem('token', response.data.token);
        
        // Show success message
        toast.success('Welcome! You are now logged in as a guest.');
        
        // Redirect to book-ride page
        navigate('/dashboard/book-ride');
      }
    } catch (error) {
      console.error('Guest login error:', error);
      toast.error('Failed to login as guest. Please try again.');
    }
  };

  return (
    <button
      onClick={handleGuestLogin}
      className={`
        flex items-center justify-center gap-3 
        bg-gray-600 hover:bg-gray-700 
        text-white border-2 border-gray-600 
        hover:border-gray-700
        transition-colors duration-200
        font-medium rounded-lg
        ${compact ? "px-4 py-2 text-xs" : "px-6 py-3 text-base"}
        ${compact ? "w-40" : "w-48"}
      `}
    >
      <svg 
        className={compact ? "w-4 h-4" : "w-5 h-5"} 
        fill="currentColor" 
        viewBox="0 0 24 24"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
      </svg>
      Login as Guest
    </button>
  );
};

export default GuestLoginButton; 