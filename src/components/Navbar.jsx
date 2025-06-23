"use client";
// src/components/NavBar.jsx
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes, FaUserShield } from 'react-icons/fa';

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50 backdrop-blur-md bg-opacity-80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold">
              <span className="text-blue-400">discount</span>
              <span className="text-white-500">mithrA</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link
              href="/home"
              className={
                isActive('/home')
                  ? 'text-blue-400 font-semibold'
                  : 'hover:text-blue-300 transition duration-200'
              }
            >
              Home
            </Link>
            <Link
              href="/locations"
              className={
                isActive('/locations')
                  ? 'text-blue-400 font-semibold'
                  : 'hover:text-blue-300 transition duration-200'
              }
            >
              Services
            </Link>
            <Link
              href="/download"
              className={
                isActive('/download')
                  ? 'text-blue-400 font-semibold'
                  : 'hover:text-blue-300 transition duration-200'
              }
            >
              Download
            </Link>
            <Link
              href="/login"
              className={
                isActive('/login')
                  ? 'text-blue-400 font-semibold'
                  : 'hover:text-blue-300 transition duration-200'
              }
            >
              login
            </Link>
            <Link
              href="/admin/dashboard"
              className="flex items-center space-x-1 bg-indigo-600 hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
            >
              <FaUserShield className="text-sm" />
              <span>Admin</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800 bg-opacity-90 pb-4">
          <div className="flex flex-col space-y-3 px-4">
            <Link
              href="/home"
              className={
                isActive('/home')
                  ? 'text-blue-400 font-semibold'
                  : 'text-gray-300 hover:text-blue-400 transition duration-200'
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/locations"
              className={
                isActive('/locations')
                  ? 'text-blue-400 font-semibold'
                  : 'text-gray-300 hover:text-blue-400 transition duration-200'
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/download"
              className={
                isActive('/download')
                  ? 'text-blue-400 font-semibold'
                  : 'text-gray-300 hover:text-blue-400 transition duration-200'
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Download
            </Link>
            <Link
              href="/login"
              className={
                isActive('/login')
                  ? 'text-blue-400 font-semibold'
                  : 'text-gray-300 hover:text-blue-400 transition duration-200'
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              login
            </Link>
            <Link
              href="/admin/dashboard"
              className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium transition duration-200 mt-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaUserShield className="text-sm" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
