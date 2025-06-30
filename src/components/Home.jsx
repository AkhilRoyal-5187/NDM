"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link'; // Ensure Link is imported
import AboutSection from '../components/AboutSection';
import MembershipSection from '../components/MembershipSection';
import ContactSection from '../components/ContactSection';
import {
  FaHospital,
  FaShoppingBasket,
  FaCut,
  FaGraduationCap,
  FaPlaneDeparture,
  FaFilm,
  FaDumbbell,
  FaGift
} from "react-icons/fa";
import { GiKnifeFork } from "react-icons/gi";

const iconItems = [
  // IMPORTANT: Added 'href' property to each item
  { bgColor: "bg-red-100", iconColor: "text-red-500", hoverIconColor: "hover:text-red-600", label: "Hospital", Icon: FaHospital, href: "/hospitals" },
  { bgColor: "bg-orange-100", iconColor: "text-orange-500", hoverIconColor: "hover:text-orange-600", label: "Restaurant", Icon: GiKnifeFork, href: "/food" },
  { bgColor: "bg-green-100", iconColor: "text-green-500", hoverIconColor: "hover:text-green-600", label: "Groceries", Icon: FaShoppingBasket, href: "/fresh" },
  { bgColor: "bg-purple-100", iconColor: "text-purple-500", hoverIconColor: "hover:text-purple-600", label: "Gifts", Icon: FaGift, href: "/gift-articles" },
  { bgColor: "bg-pink-100", iconColor: "text-pink-500", hoverIconColor: "hover:text-pink-600", label: "Salon", Icon: FaCut, href: "/salons" },
  { bgColor: "bg-yellow-100", iconColor: "text-yellow-600", hoverIconColor: "hover:text-yellow-700", label: "Education", Icon: FaGraduationCap, href: "/education" },
  { bgColor: "bg-blue-100", iconColor: "text-blue-500", hoverIconColor: "hover:text-blue-600", label: "Travel", Icon: FaPlaneDeparture, href: "/travels" },
  { bgColor: "bg-indigo-100", iconColor: "text-indigo-500", hoverIconColor: "hover:text-indigo-600", label: "Entertainment", Icon: FaFilm, href: "/events" },
  { bgColor: "bg-teal-100", iconColor: "text-teal-500", hoverIconColor: "hover:text-teal-600", label: "Fitness", Icon: FaDumbbell, href: "/services" },
];

const HomePage = () => {
  const leftVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6 },
    }),
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full px-4 sm:px-6 lg:px-8 mb-12 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 via-gray-900 to-black shadow-2xl backdrop-blur-lg transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20 pointer-events-none"></div>
        <div className="relative max-w-7xl mx-auto py-8 sm:py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={leftVariants}
              custom={0}
              className="text-center lg:text-left lg:w-1/2 space-y-6"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-blue-400 font-inter">
                Welcome to discountmithrA
              </h3>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Your Friendly <br /> <span className="text-white">Discount Companion</span>
              </h2>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={gridVariants}
              className="grid grid-cols-3 sm:grid-cols-4 gap-4 lg:w-1/2 p-6 bg-gray-800/50 rounded-xl shadow-inner backdrop-blur-md border border-gray-700"
            >
              {iconItems.map(({ bgColor, iconColor, hoverIconColor, label, Icon, href }, index) => (
                // Use Link with legacyBehavior to wrap motion.a
                <Link key={index} href={href} legacyBehavior>
                  {/* motion.a renders as an <a> tag and can be animated by Framer Motion */}
                  <motion.a
                    // Apply div-like styles to the <a> tag
                    className={`${bgColor} rounded-lg p-4 flex flex-col items-center cursor-pointer shadow-md transition-shadow duration-300`}
                    variants={iconVariants}
                    whileHover={{
                      scale: 1.1,
                      boxShadow: "0 8px 15px rgba(0,0,0,0.3)",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    }}
                    // Add an aria-label for accessibility
                    aria-label={`Go to ${label} discounts`}
                  >
                    <Icon
                      className={`w-10 h-10 ${iconColor} ${hoverIconColor} transition-colors duration-300`}
                    />
                    {/* Ensure text color is white for visibility within the <a> tag */}
                    <span className="mt-2 text-gray-900 font-semibold">{label}</span>
                  </motion.a>
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <AboutSection />
      <MembershipSection />
      <ContactSection />
    </div>
  );
};

export default HomePage;