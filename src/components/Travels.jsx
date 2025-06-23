// src/components/HospitalCards.jsx
import React from "react";
import { motion } from "framer-motion";
import travel_img from "../assests/travels.jpg";
import Note from "./note";

const Travel = [
  {
    id: 1,
    name: "Sircilla Travels",
    image: travel_img,
    address: "Old Bus Stand",

    Discounts: {
      d1: "10% on packages",
      d2: "5% ticket discount",
      d3: "Loyalty program",
    },
    phone: "7799663223",
  },
  {
    id: 2,
    name: "Holiday Plannerz",
    image: travel_img,
    address: "Main Road",
    distance: "5.8 km",
    Discounts: {
      d1: "15% on trips",
      d2: "Customized packages",
      d3: "EMI available",
    },
    phone: "7799663223",
  },

  {
    id: 3,
    name: "City Cab Services",
    image: travel_img,
    address: "Gandhi Nagar",
    distance: "10.2 km",
    Discounts: {
      d1: "10% off",
      d2: "Round-trip deals",
      d3: "Free water bottles",
    },
    phone: "7799663223",
  },
];

const TravelCards = () => {
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
      className="bg-gray-900 min-h-screen text-white p-6 space-y-8 max-w-4xl mx-auto"
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
       Travels in Sircilla
          </motion.h1>
          <Note/>
      <div className="space-y-6">
        {Travel.map((travels) => (
          <motion.div
            key={travels.id}
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
                src={travels.image}
                alt={travels.name}
                className="w-24 h-24 object-cover rounded-md"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />
              <div>
                <h3 className="font-bold text-xl text-white">{travels.name}</h3>
                <p className="text-gray-300 text-sm">{travels.address}</p>
                <p className="text-l my-1">Discounts:</p>
                <ul className="text-gray-400 text-xs mt-1 list-disc pl-4 space-y-1">
                  {Object.values(travels.Discounts).map((discount, index) => (
                    <li key={index}>{discount}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Book Now Button */}
            <motion.button
              className="bg-gradient-to-r from-blue-400 to-purple-400 text-white text-sm px-6 py-2 rounded-full hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Now
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TravelCards;
