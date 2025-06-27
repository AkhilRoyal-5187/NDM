// src/components/HospitalCards.jsx
"use client";
import React, { useState, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import Note from "./note";

const hospitals = [
  {
    id: 1,
    name: "Lullu Children's Hospital",
    image: '/assests/doctor.jpg',
    address: "Gandhi Nagar, Sircilla",
    Discounts: {
      d1: "OP🩺 - FREE",
      d2: "IP Billing🛏️ (excluding: consumables, pharmacy & surgicals) - 40%",
      d3: "LAB tests🔬 (excluding outsourced) - 20%",
      d4: "Pharmacy - 10%",
    },
    phone: "7799663223",
  },
  {
    id: 2,
    name: "Aditya Neuro & Ortho",
    image: '/assests/doctor.jpg',
    address: "Sircilla",
    Discounts: {
      d1: "OP🩺 - 100 OFF",
      d2: "Pharmacy - 10%",
      d3: "IP Billing🛏️ (excluding: consumables, pharmacy & surgicals) - 20%",
      d4: "LAB tests🔬 (excluding outsourced) - 20%",
    },
    phone: "7799663223",
  },
  {
    id: 3,
    name: "Amrutha Hospital",
    image: '/assests/doctor.jpg',
    address: "Sircilla",
    Discounts: {
      d1: "OP🩺 - 40%",
      d2: "Pharmacy - 0%",
      d3: "IP Billing🛛️ (excluding: consumables, pharmacy & surgicals) - 40%",
      d4: "LAB tests🔬 (excluding outsourced) - 40%",
    },
    phone: "7799663223",
  },
  {
    id: 4,
    name: "Chandana Chest Hospital",
    image: '/assests/doctor.jpg',
    address: "Sircilla",
    Discounts: {
      d1: "OP🩺 - 50%",
      d2: "Pharmacy - 0%",
      d3: "IP Billing🛏️ (excluding: consumables, pharmacy & surgicals) - 25%",
      d4: "LAB tests🔬 (excluding outsourced) - 25%",
    },
    phone: "7799663223",
  },
  {
    id: 5,
    name: "Sri Siddi Vinayaka E.N.T Hospital",
    image: '/assests/doctor.jpg',
    address: "3-2-84/1, Near Old Bus Stand, Sircilla, Rajanna Sircilla, 505301",
    Discounts: {
      d1: "OP🩺 - 100 OFF",
      d2: "Pharmacy - 15%",
      d3: "IP Billing🛏️ (excluding: consumables, pharmacy & surgicals) - 30%",
      d4: "LAB tests🔬 (excluding outsourced) - 30%",
    },
    phone: "7799663223",
  },
  {
    id: 6,
    name: "Vihaana Multispeciality Dental Care",
    image: '/assests/doctor.jpg',
    address:
      "Karimnagar - Sircilla Rd, near OLD BUS STAND, Shanti Nagar, Sircilla, Telangana 505301",
    Discounts: {
      d1: "OP🩺 - FREE",
      d2: "X-ray🩻 - FREE",
      d3: "Dental Care - 25% to 30%",
      d4: "Laser Flap Surgery (excluding outsourced) - 40%",
    },
    phone: "7799663223",
  },
  {
    id: 7,
    name: "Vinayaka Dental Care - Women Doctor",
    image: '/assests/doctor.jpg',
    address:
      "Opposite College Ground, in Manasa Hospital, Sircilla, Telangana 505301",
    Discounts: {
      d1: "OP🩺 - FREE",
      d2: "X-ray🩻 - FREE",
      d3: "Dental Care - 25% to 30%",
      d4: "Laser Flap Surgery (excluding outsourced) - 40%",
    },
    phone: "7799663223",
  },
  {
    id: 8,
    name: "ShivaSai Optics",
    image: '/assests/doctor.jpg',
    address: "Opposite Old Bus Stand, Sircilla, Telangana 505301",
    Discounts: {
      d1: "Eye Checkup - FREE",
      d2: "Glasses - Start at ₹649",
      d3: "Branded Glasses - 25% to 30%",
    },
    phone: "7799663223",
  },
  {
    id: 9,
    name: "Laboratory",
    image: '/assests/doctor.jpg',
    address: "Coming Soon",
    Discounts: {
      d1: "Blood Test - 40%",
      d2: "Special Tests - 25%",
      d3: "Packages - 40%",
    },
    phone: "7799663223",
  },
  {
    id: 10,
    name: "Medical Store",
    image: '/assests/doctor.jpg',
    address: "Near Old Bus Stand, Sircilla, Rajanna Sircilla, 505301",
    Discounts: {
      d1: "Ethical Medicine - 23%",
      d2: "Personal Care & Hygiene - 10% to 15%",
      d3: "Medical Devices & Accessories - 20% to 50%",
    },
    phone: "7799663223",
  },
];

const HospitalCards = () => { // Renamed from Hospitals to HospitalCards for consistency with previous components
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [bookingStatus, setBookingStatus] = useState(null); // 'idle', 'loading', 'success', 'error'
  const [bookingMessage, setBookingMessage] = useState(''); // Message to display to the user

  const handleBookNow = async (serviceName, servicePhoneNumber) => {
    setBookingStatus('loading');
    setBookingMessage('Sending booking request...');

    // --- IMPORTANT: Replace with actual logged-in user data ---
    // In a real application, you'd get this from your authentication context (e.g., NextAuth.js session)
    const userName = "Praveen Makka"; // Placeholder for logged-in user's name
    const userPhoneNumber = "+918985114785"; // Placeholder for logged-in user's phone number
                                             // (Make sure this is VERIFIED in Twilio for trial account testing)
    // --- End of IMPORTANT section ---


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
        setBookingMessage(`Booking for "${serviceName}" confirmed! A confirmation SMS has been sent to you. The business owner will contact you shortly.`);
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
        Hospitals & Medical Services in Sircilla
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
        {hospitals.map((hospital) => (
          <motion.div
            key={hospital.id}
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
                src={hospital.image}
                alt={hospital.name}
                className="w-24 h-24 object-cover rounded-md"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                onError={(e) => { e.target.onerror = null; e.target.src = '/assests/doctor.jpg'; }}
              />
              <div>
                <h3 className="font-bold text-xl text-white">
                  {hospital.name}
                </h3>
                <p className="text-gray-300 text-sm">
                  location : {hospital.address}
                </p>
                <p className="text-l font-bold">Discounts:</p>
                <ul className="text-gray-400 text-xs mt-1 list-disc ml-4">
                  {Object.values(hospital.Discounts).map((discount, idx) => (
                    <li key={idx}>{discount}</li>
                  ))}
                </ul>
                {hospital.phone && (
                  <p className="text-gray-400 text-xs mt-1">
                    📞 {hospital.phone}
                  </p>
                )}
              </div>
            </div>

            {/* Book Now Button */}
            <motion.button
              className="bg-gradient-to-r from-blue-400 to-purple-400 text-white text-sm px-6 py-2 rounded-full hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleBookNow(hospital.name, hospital.phone)} // Corrected comment syntax
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

export default HospitalCards; // Exporting as HospitalCards