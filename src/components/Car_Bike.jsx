import React from "react";
import { motion } from "framer-motion";
import carService_img from "../assests/car_repair.avif";
import Note from "./note";
const CarServices = [
  {
    id: 1,
    name: "Car Repair Pro",
    image: carService_img,
    location: "Old Petrol Bunk",

    Discounts: {
      d1: "20% on labor",
      d2: "10% on spares",
      d3: "10% on packages",
    },
    phone: "7799663223",
  },
  {
    id: 2,
    name: "Bike Repair Hub",
    image: carService_img,
    location: " Near College",

    Discounts: {
      d1: "Free checkup",
      d2: " Labor charge - 15%",
      d3: "Parts discount - 10%",
    },
    phone: "7799663223",
  },
  {
    id: 3,
    name: "Vasavi Auto Mobiles",
    image: carService_img,
    location: "Karimnagar Road",
    Discounts: {
      d1: "Up to 20% off",
    },
    phone: "7799663223",
  },
  {
    id: 4,
    name: "Sri manjunatha hydralic water sarwising center",
    image: carService_img,
    location: "Srinagar Colany,Karimnagar Road",
    Discounts: {
      d1: "Up to 150 off",
    },
    phone: "7799663223",
  },
  {
    id: 5,
    name: "Sridurga battery",
    image: carService_img,
    location: "chandrampet hanuman temple chowrasta,Karimnagar Road,Sircilla",
    Discounts: {
      d1: "35% Discoount on Amaron Battery(with exchange)Up to 20% off",
      d2: "30% Discount on all Other Battery's(with Exchange)",
    },
    phone: "7799663223",
  },
  {
    id: 6,
    name: "engine carbon cleaning",
    image: carService_img,
    location: "soon",
    Discounts: {
      d1: " Up to 50% off",
    },
    phone: "7799663223",
  },
];

const CarServiceCards = () => {
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
        Car and Bike Services in Sircilla
      </motion.h1>
      <Note/>
      <div className="space-y-6">
        {CarServices.map((services) => (
          <motion.div
            key={services.id}
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
                src={services.image}
                alt={services.name}
                className="w-24 h-24 object-cover rounded-md"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />
              <div>
                <h3 className="font-bold text-xl text-white">
                  {services.name}
                </h3>
                <p className="text-gray-300 text-sm">
                  location : {services.location}
                </p>
                <p className="text-l font-bold">Discounts:</p>
                <ul className="text-gray-400 text-xs mt-1 list-disc ml-4">
                  {Object.values(services.Discounts).map((discount, idx) => (
                    <li key={idx}>{discount}</li>
                  ))}
                </ul>
                {services.phone && (
                  <p className="text-gray-400 text-xs mt-1">
                    📞 {services.phone}
                  </p>
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

export default CarServiceCards;
