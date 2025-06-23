"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { motion } from 'framer-motion';

// Configure axios defaults
// When using Next.js API routes on the same domain,
// you can often use relative paths, so baseURL can be omitted
// or set to an empty string. Axios will then use the current origin.
axios.defaults.baseURL = ''; // Set to empty string for relative paths
axios.defaults.headers.common['Content-Type'] = 'application/json';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Call your Next.js API route for admin login
      const response = await axios.post('/api/admin/login', {
        username: username.trim(),
        password: password.trim()
      });

      if (response.data && response.data.token) {
        // Store the token in sessionStorage
        sessionStorage.setItem('adminToken', response.data.token);
        // Store admin info if available
        if (response.data.admin) {
          sessionStorage.setItem('adminInfo', JSON.stringify(response.data.admin));
        }
        // Redirect to admin dashboard
        router.push('/admin/dashboard');
      } else {
        setError('Invalid response from server');
      }
    } catch (err) {
      console.error('Login error:', err);
      if (axios.isAxiosError(err) && err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(err.response.data.message || 'Invalid username or password');
      } else if (axios.isAxiosError(err) && err.request) {
        // The request was made but no response was received
        setError('Unable to connect to server. Please try again later.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Animation variants (no changes needed)
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const errorVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-lg shadow-lg"
        variants={itemVariants}
      >
        <motion.div variants={itemVariants}>
          <motion.h2
            className="mt-6 text-center text-3xl font-extrabold text-white"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            Admin Login
          </motion.h2>
        </motion.div>

        <motion.form
          className="mt-8 space-y-6"
          onSubmit={handleSubmit}
          variants={itemVariants}
        >
          {error && (
            <motion.div
              className="bg-red-500 text-white p-3 rounded-md text-center"
              variants={errorVariants}
              initial="hidden"
              animate="visible"
            >
              {error}
            </motion.div>
          )}

          <motion.div
            className="rounded-md shadow-sm -space-y-px"
            variants={itemVariants}
          >
            <motion.div variants={itemVariants}>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <motion.input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-700 text-white placeholder-gray-400 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <motion.input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-700 text-white placeholder-gray-400 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              {loading ? (
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  🔄
                </motion.span>
              ) : (
                'Sign in'
              )}
            </motion.button>
          </motion.div>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default AdminLogin;