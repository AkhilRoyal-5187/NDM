// src/components/HospitalCards.jsx
import React from "react";
import { motion } from "framer-motion";
import Note from "./note";

const Shopping = [
  {
    id: 1,
    name: "Vishala Shopping Mall",
    image: "/assests/shopping.jpg",
    address: "Near Gandi chowk",
    Discounts: {
      d1: "5% OFF on Bill",
      d2: "10% OFF on Pattu Sarees",
      d3: "Festival deals",
    },
    phone: "7799663223",
  },
  {
    id: 2,
    name: "Reliance Trends",
    image: "/assests/shopping.jpg",
    address: " Near Old Bus stand",
    distance: "5.8 km",
    Discounts: {
      d1: "7% discount on Cash Vochers",
      d2: "Online Discount Coupons",
    },
    phone: "7799663223",
  },

  {
    id: 3,
    name: "MAX Fashion Online",
    image: "/assests/shopping.jpg",
    address: "Gandhi Nagar",
    distance: "10.2 km",
    Discounts: {
      d1: "10% discount on E-Cash Vochers",
      d2: "Online Discount Coupons",
    },
    phone: "7799663223",
  },
];

const ShoppingCards = () => {
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
        Shopping Malls in Sircilla
          </motion.h1>
          <Note/>
      <div className="space-y-6">
        {Shopping.map((shops) => (
          <motion.div
            key={shops.id}
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
                src={shops.image}
                alt={shops.name}
                className="w-24 h-24 object-cover rounded-md"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />
              <div>
                <h3 className="font-bold text-xl text-white">{shops.name}</h3>
                <p className="text-gray-300 text-sm">{shops.address}</p>
                <p className="text-l my-1">Discounts:</p>
                <ul className="text-gray-400 text-xs mt-1 list-disc pl-4 space-y-1">
                  {Object.values(shops.Discounts).map((discount, index) => (
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

export default ShoppingCards;
