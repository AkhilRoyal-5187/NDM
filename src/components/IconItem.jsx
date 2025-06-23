// src/components/IconItem.jsx
import React from 'react';
import { motion } from 'framer-motion';

const IconItem = ({ bgColor, iconColor, hoverIconColor, label, svgPath, variants }) => {
  return (
    <motion.div
      variants={variants}
      className="flex flex-col items-center"
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`p-3 rounded-full ${bgColor}`}>
        <svg
          className={`w-6 h-6 ${iconColor} ${hoverIconColor}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={svgPath} />
        </svg>
      </div>
      <span className="mt-2 text-sm text-gray-300">{label}</span>
    </motion.div>
  );
};

export default IconItem;