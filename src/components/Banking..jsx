import React from "react";
import { motion } from "framer-motion";
import bank_img from "../assests/bank.jpg";
import Note from "./note";
const Banking = [
  {
    id: 1,
    name: "Debit & Credits",
    image: bank_img,
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
    image: bank_img,
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
    image: bank_img,
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
        Banking in Sircilla
          </motion.h1>
          <Note/>
      <div className="space-y-6">
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
            >
              Book Now
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default BankingCards;
