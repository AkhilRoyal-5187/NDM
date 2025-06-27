// src/components/FoodCards.jsx
"use client"; // This component runs on the client side

import React, { useState, useLayoutEffect } from "react"; // Import useState and useLayoutEffect
import { motion } from "framer-motion";
import Note from "./note";

const restaurants = [
  {
    id: 1,
    name: "7 Arts Restaurant",
    image: '/assests/Restaurants.jpg',
    address: "Gandhi Nagar, Sircilla",
    discounts: {
      d1: " 10% on bill",
      d2: " Party discounts",
      d3: "Home deliveryHome delivery",
    },
    phone: "7799663223", // Added a phone number for booking
  },
  {
    id: 2,
    name: "Ice House",
    image: '/assests/Restaurants.jpg',
    address: "Sircilla",
    discounts: {
      d1: "10% on menu",
      d2: "15% on 1000+Bill",
    },
    phone: "7799663223", // Added a phone number for booking
  },
  {
    id: 3,
    name: "Shankar Pani Puri",
    image: '/assests/Restaurants.jpg',
    address: "Shivalayam, Sircilla",
    discounts: {
      d1: "15% bill discount",
      d2: "20% on 200 bill",
      d3: "35% Party catering"
    },
    phone: "7799663223", // Added a phone number for booking
  },
];

const FoodCards = () => {
  // Scroll to top on component mount
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // State for managing booking status and messages
  const [bookingStatus, setBookingStatus] = useState(null); // 'idle', 'loading', 'success', 'error'
  const [bookingMessage, setBookingMessage] = useState(''); // Message to display to the user

  // Function to handle the "Book Now" click
  const handleBookNow = async (serviceName, servicePhoneNumber) => {
    setBookingStatus('loading');
    setBookingMessage('Sending booking request...');

    // --- IMPORTANT: Replace with actual logged-in user data ---
    // In a real application, you would get these values from your authentication context.
    const userName = "Praveen Makka"; // Placeholder for logged-in user's name
    const userPhoneNumber = "+918985114785"; // Placeholder for logged-in user's phone number
                                             // Ensure this is a VERIFIED number in your Twilio trial account for testing.
    // --- End of IMPORTANT section ---

    // Ensure a phone number is available for the service provider
    if (!servicePhoneNumber) {
        setBookingStatus('error');
        setBookingMessage(`Booking failed: Phone number for ${serviceName} is missing.`);
        return;
    }

    try {
      const response = await fetch('/api/book-service', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ serviceName, servicePhoneNumber, userName, userPhoneNumber }),
      });

      const data = await response.json();

      if (response.ok) {
        setBookingStatus('success');
        setBookingMessage(`Booking for "${serviceName}" confirmed! A confirmation SMS has been sent to you. The restaurant will contact you shortly.`);
        // Clear message after a few seconds
        setTimeout(() => {
          setBookingStatus(null);
          setBookingMessage('');
        }, 7000);
      } else {
        setBookingStatus('error');
        setBookingMessage(`Failed to book "${serviceName}": ${data.message || 'Unknown error'}.`);
      }
    } catch (error) {
      console.error('Error during booking:', error);
      setBookingStatus('error');
      setBookingMessage(`An error occurred while booking "${serviceName}". Please try again.`);
    }
  };


  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
    className="bg-gray-900 min-h-screen text-white p-6 space-y-8 w-full"
    initial="hidden"
      animate="visible"
      variants={sectionVariants}
    >
      <motion.h1
        className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Food in Sircilla
      </motion.h1>
      <Note />

      {/* Booking Status Message Display */}
      {bookingMessage && (
          <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3 rounded-md text-center text-sm font-medium ${
                  bookingStatus === 'success' ? 'bg-green-500 text-white' :
                  bookingStatus === 'error' ? 'bg-red-500 text-white' :
                  'bg-blue-500 text-white'
              } max-w-xl mx-auto mb-4`}
          >
              {bookingMessage}
          </motion.div>
      )}

      <div className="space-y-6">
        {restaurants.map((restaurant) => (
          <motion.div
            key={restaurant.id}
            variants={cardVariants}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
              transition: { duration: 0.3 },
            }}
            className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between bg-gray-800/50 backdrop-blur-md border border-gray-700 p-6 rounded-xl shadow-lg"
          >
            {/* Left Section */}
            <div className="flex items-center gap-5">
              <motion.img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-24 h-24 object-cover rounded-md"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                onError={(e) => { e.target.onerror = null; e.target.src = '/assests/Restaurants.jpg'; }} // Fallback image
              />
              <div>
                <h3 className="font-bold text-xl text-white">
                  {restaurant.name}
                </h3>
                <p className="text-gray-300 text-sm">{restaurant.address}</p>
                <p className="text-l my-1">Discounts:</p>
                <ul className="text-gray-400 text-xs mt-1 list-disc pl-4 space-y-1">
                  {Object.values(restaurant.discounts).map((discount, index) => (
                    <li key={index}>{discount}</li>
                  ))}
                </ul>
                {restaurant.phone && ( // Display phone if available
                  <p className="text-gray-400 text-xs mt-1">
                    📞 {restaurant.phone}
                  </p>
                )}
              </div>
            </div>

            {/* Book Now Button */}
            <motion.button
              className="bg-gradient-to-r from-blue-400 to-purple-400 text-white text-sm px-6 py-2 rounded-full hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleBookNow(restaurant.name, restaurant.phone)} // Call handler with service details
              disabled={bookingStatus === 'loading'} // Disable button during loading
            >
              {bookingStatus === 'loading' ? 'Booking...' : 'Book Now'} {/* Dynamic button text */}
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default FoodCards;