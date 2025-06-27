// src/components/Education.jsx (or EducationCards.jsx, based on your file naming)
"use client";
import React, { useState, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import Note from "./note";

const institutions = [
  {
    id: 1,
    name: "Online Skill Development",
    image: '/assests/school.jpg',
    location: "Online",
    Discounts: {
      d1: "100+Free Courses with Certigication",
      d2: "100+Free Courses with Certigication",
      d3: "Packages - 35%",
    },
    phone: "7799663223",
  },
  {
    id: 2,
    name: "******** School",
    image: '/assests/school.jpg',
    location: "coming Soon",
    Discounts: {
      d1: "100+Free Courses with Certigication",
      d2: "100+Free Courses with Certigication",
      d3: "Packages - 35%",
    },
    phone: "7799663223",
  },
  {
    id: 3,
    name: "******* Degree College",
    image: '/assests/school.jpg',
    location: "Online",
    Discounts: {
      d1: "100+Free Courses with Certigication",
      d2: "100+Free Courses with Certigication",
      d3: "Packages - 35%",
    },
    phone: "7799663223", // Added phone for consistency, assuming a default if not present
  },
  {
    id: 4,
    name: "******* Inter College",
    image: '/assests/school.jpg',
    location: "Online",
    Discounts: {
      d1: "100+Free Courses with Certigication",
      d2: "100+Free Courses with Certigication",
      d3: "Packages - 35%",
    },
    phone: "7799663223", // Added phone for consistency, assuming a default if not present
  },
  {
    id: 5,
    name: "****** Coaching Center",
    image: '/assests/school.jpg',
    location: "Online",
    Discounts: {
      d1: "100+Free Courses with Certigication",
      d2: "100+Free Courses with Certigication",
      d3: "Packages - 35%",
    },
    phone: "7799663223", // Added phone for consistency, assuming a default if not present
  },
];

const EducationCards = () => { // Original component name was EducationCards, but error showed Education.jsx. Keeping EducationCards as the component name.
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [bookingStatus, setBookingStatus] = useState(null);
  const [bookingMessage, setBookingMessage] = useState('');

  const handleBookNow = async (serviceName, servicePhoneNumber) => {
    setBookingStatus('loading');
    setBookingMessage('Sending booking request...');

    const userName = "Praveen Makka";
    const userPhoneNumber = "+918985114785";

    const finalServicePhoneNumber = servicePhoneNumber || "7799663223";

    try {
      const response = await fetch('/api/book-service', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ serviceName, servicePhoneNumber: finalServicePhoneNumber, userName, userPhoneNumber }),
      });

      const data = await response.json();

      if (response.ok) {
        setBookingStatus('success');
        setBookingMessage(`Booking for "${serviceName}" confirmed! A confirmation SMS has been sent to you. The institution will contact you shortly.`);
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
        Educational Institutions in Sircilla
      </motion.h1>
      <Note />

      {/* Booking Status Message */}
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
        {institutions.map((institution) => (
          <motion.div
            key={institution.id}
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
                src={institution.image}
                alt={institution.name}
                className="w-24 h-24 object-cover rounded-md"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                onError={(e) => { e.target.onerror = null; e.target.src = '/assests/school.jpg'; }}
              />
              <div>
                <h3 className="font-bold text-xl text-white">
                  {institution.name}
                </h3>
                <p className="text-gray-300 text-sm">
                  location : {institution.location}
                </p>
                <p className="text-l font-bold">Discounts:</p>
                <ul className="text-gray-400 text-xs mt-1 list-disc ml-4">
                  {Object.values(institution.Discounts).map((discount, idx) => (
                    <li key={idx}>{discount}</li>
                  ))}
                </ul>
                {institution.phone ? (
                  <p className="text-gray-400 text-xs mt-1">
                    📞 {institution.phone}
                  </p>
                ) : (
                  <p className="text-gray-400 text-xs mt-1">
                    📞 Phone number not available directly.
                  </p>
                )}
              </div>
            </div>

            {/* Book Now Button */}
            <motion.button
              className="bg-gradient-to-r from-blue-400 to-purple-400 text-white text-sm px-6 py-2 rounded-full hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleBookNow(institution.name, institution.phone)} // Corrected comment syntax
              disabled={bookingStatus === 'loading'}
            >
              {bookingStatus === 'loading' ? 'Booking...' : 'Book Now'}
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default EducationCards; // Exporting as EducationCards