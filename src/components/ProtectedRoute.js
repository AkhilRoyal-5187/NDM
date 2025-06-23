"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const adminToken = sessionStorage.getItem('adminToken');
    if (adminToken) {
      setIsAuthenticated(true);
    } else {
      router.push('/admin/login');
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
};

export default ProtectedRoute; 