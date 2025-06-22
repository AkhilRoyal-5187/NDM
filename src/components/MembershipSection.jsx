"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const MembershipSection = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  };

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center justify-center min-h-screen">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="text-center space-y-6"
      >
        <h2 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          Join Discount Mithra
        </h2>
        <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
          Unlock exclusive discounts and premium benefits with our membership plans.
        </p>
      </motion.div>

      <motion.div
        className="mt-12 flex justify-center"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      >
        {[
          {
            title: 'Join Our Discount Policy',
            price: '₹999/year',
            features: ['Save on all services for your family'],
            cta: 'Subscribe Now',
            link: '/signup',
          },
        ].map((plan, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className="p-6 bg-gray-800/50 rounded-xl shadow-inner border border-gray-700 backdrop-blur-md hover:shadow-xl transition-shadow w-full max-w-md"
          >
            <h3 className="text-2xl font-bold text-white">{plan.title}</h3>
            <p className="mt-2 text-3xl font-extrabold text-blue-400">{plan.price}</p>
            <ul className="mt-4 space-y-2 text-gray-300">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-400 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              href={plan.link}
              className="mt-6 inline-block px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-400 to-purple-400 rounded-full hover:scale-105 transition-transform duration-300"
            >
              {plan.cta}
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default MembershipSection;
