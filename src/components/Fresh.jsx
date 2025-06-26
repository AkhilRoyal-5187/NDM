// src/components/FoodCards.jsx
import React from "react";
import { motion } from "framer-motion";
import Note from "./note";

const FreshItems = [
  {
    id: 1,
    name: "Daily Veggie Market",
    image: '/assests/fresh_img.jpg',
    address: "Main Bazar",
    Discounts: {
      d1: "20% on veggies🥕",
      d2: "25% combo pack",
      d3: "Free delivery(soon)",
    },
    phone: "7799663223",
  },
  {
    id: 2,
    name: "Fresh Mutton Shop",
    image: '/assests/fresh_img.jpg',
    address: "soon",
    Discounts: {
      d1: "₹50 off/kg",
      d2: "₹75 off/3kg",
      d3: "100 off-Bulk orders",
    },
    phone: "7799663223",
  },
  {
    id: 3,
    name: "Fresh Fish Shop",
    image: '/assests/fresh_img.jpg',
    address: " Soon",
    Discounts: {
      d1: "₹50 off/kg-Fish🐟",
      d2: "₹50 off/kg-Prawns🍤",
      d3: "30 off/kg-Party orders",
    },
    phone: "7799663223",
  },
  {
    id: 4,
    name: "Fresh Chicken Shop",
    image: '/assests/fresh_img.jpg',
    address: " Soon",
    Discounts: {
      d1: "₹20 off/k30g🍗",
      d2: "₹30 off/3kgs",
      d3: "₹30 off/kg-Party orders",
    },
    phone: "7799663223",
  },
  {
    id: 5,
    name: "Milk & More",
    image: '/assests/fresh_img.jpg',
    address: " Soon",
    Discounts: {
      d1: "5% milk discount🥛",
      d2: "10% on paneer🥘",
      d3: "15% on bulk",
    },
    phone: "7799663223",
  },
];

const FreshCards = () => {
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
          <Note/>
      <div className="space-y-6">
        {FreshItems.map((fresh) => (
          <motion.div
            key={fresh.id}
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
                src={fresh.image}
                alt={fresh.name}
                className="w-24 h-24 object-cover rounded-md"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />
              <div>
                <h3 className="font-bold text-xl text-white">{fresh.name}</h3>
                <p className="text-gray-300 text-sm">location : {fresh.address}</p>
                <p className="text-l font-bold">Discounts:</p>
                <ul className="text-gray-400 text-xs mt-1 list-disc ml-4">
                  {Object.values(fresh.Discounts).map((discount, idx) => (
                    <li key={idx}>{discount}</li>
                  ))}
                </ul>
                <p className="text-gray-400 text-xs mt-1">
                  {fresh.distance} away
                </p>
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

export default FreshCards;
