// src/context/AuthContext.js
"use client"; // This context will manage client-side state

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [userPhoneNumber, setUserPhoneNumber] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // On initial load, check if user data exists in session storage
  useEffect(() => {
    try {
      const storedUser = sessionStorage.getItem('userAuth');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user && user.phoneNumber) {
          setUserPhoneNumber(user.phoneNumber);
          setIsLoggedIn(true);
        }
      }
    } catch (e) {
      console.error("Failed to parse userAuth from sessionStorage", e);
      // Clear potentially corrupt storage
      sessionStorage.removeItem('userAuth');
    }
  }, []);

  const login = (phoneNumber) => {
    // In a real app, you'd get a token from your backend login API
    // For now, we'll just store the phone number
    const userAuthData = { phoneNumber: phoneNumber };
    sessionStorage.setItem('userAuth', JSON.stringify(userAuthData));
    setUserPhoneNumber(phoneNumber);
    setIsLoggedIn(true);
  };

  const logout = () => {
    sessionStorage.removeItem('userAuth');
    setUserPhoneNumber(null);
    setIsLoggedIn(false);
    router.push('/login'); // Redirect to user login page after logout
  };

  return (
    <AuthContext.Provider value={{ userPhoneNumber, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};