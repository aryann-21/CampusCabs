// src/context/UserContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on app start
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token with backend
      axios.get(`https://campuscabs-backend-75tijk2le-aryann-21s-projects.vercel.app/api/auth/verify`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        if (response.data.success) {
          setUser(response.data.user);
        } else {
          localStorage.removeItem('token');
        }
      })
      .catch(() => {
        localStorage.removeItem('token');
      })
      .finally(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    
    // Show different message for guest users
    if (user?.isGuest) {
      toast.info('Guest session ended. You can login again anytime.');
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
