// src/components/BankingCards.jsx
"use client"; // This component runs on the client side

import React, { useState, useLayoutEffect } from "react"; // Import useState and useLayoutEffect
import { motion } from "framer-motion";
import Note from "./note"; // Assuming Note.js is in the same directory

const Banking = [
  {
    id: 1,
    name: "Debit & Credits",
    image: '/assests/bank.jpg',
    location: "Siricilla",
    Discounts: {
      d1: "0% processing fee",
      d2: "₹1000 cashback",
      d3: "refer and earn 500",
    },
    phone: "7799663223",
  },
  {
    id: 2,
    name: "HDFC Credit Cards",
    image: '/assests/bank.jpg',
    location: "Bus stand",
    Discounts: {
      d1: "10% EMI offers",
      d2: " ₹1000 bonus",
      d3: "15% lounge access",
    },
    phone: "7799663223",
  },
  {
    id: 3,
    name: "Loan Services",
    image: '/assests/bank.jpg',
    location: "discountmithra",
    Discounts: {
      d1: "5% processing fee off",
      d2: "10% loan rate discount",
      d3: "15% service offer",
      },
    phone: "7799663223",
  },
];

const BankingCards = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [bookingStatus, setBookingStatus] = useState(null); // 'idle', 'loading', 'success', 'error'
  const [bookingMessage, setBookingMessage] = useState(''); // Message to display to the user

  const handleBookNow = async (serviceName, servicePhoneNumber) => {
    setBookingStatus('loading');
    setBookingMessage('Sending booking request...');

    // --- IMPORTANT: Replace with actual logged-in user data ---
    const userName = "Praveen Makka"; // Placeholder for logged-in user's name
    const userPhoneNumber = "+918985114785"; // Placeholder for logged-in user's phone number
                                             // Ensure this is a VERIFIED number in your Twilio trial account for testing.
    // --- End of IMPORTANT section ---

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
        setBookingMessage(`Booking for "${serviceName}" confirmed! A confirmation SMS has been sent to you. The bank representative will contact you shortly.`);
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
        Banking in Sircilla
      </motion.h1>
      <Note/>

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

      {/* Container for cards - add max-width here to control inner content */}
      <div className="max-w-4xl mx-auto space-y-6 px-4 sm:px-0">
        {Banking.map((banks) => (
          <motion.div
            key={banks.id}
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
                src={banks.image}
                alt={banks.name}
                className="w-24 h-24 object-cover rounded-md"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                onError={(e) => { e.target.onerror = null; e.target.src = '/assests/bank.jpg'; }} // Fallback image
              />
              <div>
                <h3 className="font-bold text-xl text-white">{banks.name}</h3>
                <p className="text-gray-300 text-sm">
                  location : {banks.location}
                </p>
                <p className="text-l font-bold">Discounts:</p>
                <ul className="text-gray-400 text-xs mt-1 list-disc ml-4">
                  {Object.values(banks.Discounts).map((discount, idx) => (
                    <li key={idx}>{discount}</li>
                  ))}
                </ul>
                {banks.phone && (
                  <p className="text-gray-400 text-xs mt-1">📞 {banks.phone}</p>
                )}
              </div>
            </div>

            {/* Book Now Button */}
            <motion.button
              className="bg-gradient-to-r from-blue-400 to-purple-400 text-white text-sm px-6 py-2 rounded-full hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleBookNow(banks.name, banks.phone)} // Call handler with service details
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

export default BankingCards;