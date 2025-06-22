"use client";
// src/components/Signup.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import doctorImage from '../assests/doctor.jpg';

function Signup() {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('https://discount-mithra-3.onrender.com/api/auth/signup', {
        name,
        phoneNumber,
      });
      alert(response.data.message);
      router.push('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      console.error('Signup error:', err.response?.data?.error);
    }
  };

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <motion.div
        className="flex flex-col md:flex-row items-center bg-gray-800/50 p-8 rounded-2xl shadow-2xl max-w-4xl w-full backdrop-blur-md border border-gray-700"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        {/* Left Section */}
        <motion.div
          className="md:w-1/2 mb-6 md:mb-0 flex flex-col items-center"
          variants={imageVariants}
        >
          <motion.img
            src={doctorImage}
            alt="Doctor Illustration"
            className="w-full max-w-xs mx-auto object-contain drop-shadow-xl"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mt-4 text-center">
            Welcome to Discount Mithra
          </h1>
          <p className="text-gray-300 text-center mt-2 px-4 text-lg">
            Discover and book trusted healthcare services at discounted prices.
          </p>
        </motion.div>

        {/* Right Section (Form) */}
        <div className="md:w-1/2 w-full">
          <motion.div
            className="bg-gray-800/50 p-6 rounded-xl shadow-inner border border-gray-700 backdrop-blur-md"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4 text-center">
              Create Your Account
            </h2>
            {error && (
              <motion.p
                className="text-red-400 mb-4 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {error}
              </motion.p>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={inputVariants}>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
                  placeholder="Enter your full name"
                  required
                />
              </motion.div>
              <motion.div variants={inputVariants}>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-300">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="mt-1 w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
                  placeholder="+12345678901"
                  required
                />
              </motion.div>
              <motion.div variants={inputVariants}>
                <button
                  type="submit"
                  className="w-full px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-400 to-purple-400 rounded-full hover:scale-105 transition-transform duration-300"
                >
                  Sign Up
                </button>
              </motion.div>
            </form>
            <motion.div
              variants={inputVariants}
              className="mt-4 text-center text-gray-300"
            >
              <p>
                Already have an account?{' '}
                <Link href="/login" className="text-blue-400 hover:text-blue-300 transition duration-200">
                  Log In
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default Signup;