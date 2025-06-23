import React from 'react';
import { motion } from 'framer-motion';

const ContactSection = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900 opacity-50 z-0"></div>

      {/* Content */}
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="text-center space-y-6 mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Get in Touch
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            Have questions? Reach out to our team, and we’ll get back to you promptly!
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          className="mt-12 max-w-lg mx-auto bg-gray-800/50 p-8 rounded-2xl shadow-2xl border border-gray-700 backdrop-blur-md"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        >
          <form className="space-y-6">
            <motion.div variants={inputVariants}>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
              <input
                type="text"
                id="name"
                className="mt-1 w-full p-4 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                placeholder="Your Name"
              />
            </motion.div>
            <motion.div variants={inputVariants}>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
              <input
                type="email"
                id="email"
                className="mt-1 w-full p-4 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                placeholder="Your Email"
              />
            </motion.div>
            <motion.div variants={inputVariants}>
  <label htmlFor="phone" className="block text-sm font-medium text-gray-300">Phone Number</label>
  <input
    type="tel"
    id="phone"
    className="mt-1 w-full p-4 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
    placeholder="Your Phone Number"
  />
</motion.div>

            <motion.div variants={inputVariants}>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
              <textarea
                id="message"
                rows="4"
                className="mt-1 w-full p-4 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                placeholder="Your Message"
              ></textarea>
            </motion.div>
            <motion.div variants={inputVariants}>
              <button
                type="submit"
                className="w-full px-6 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:from-blue-600 hover:to-purple-700 transform hover:scale-[1.02] shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
              >
                Send Message
              </button>
            </motion.div>
          </form>
        </motion.div>

        {/* Info Cards */}
       <motion.div
  className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16"
  initial="hidden"
  animate="visible"
  variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
>
  {[
    {
      title: 'Email',
      value: 'admin@discountmithra.com',
      icon: 'M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z',
      link: 'mailto:admin@discountmithra.com',
    },
    {
      title: 'Phone',
      value: '7799663223',
      icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
      link: 'tel:7799663223',
    },
    {
      title: 'Social',
      value: 'DiscountMithra',
      icon: 'M7.75 2A5.75 5.75 0 002 7.75v8.5A5.75 5.75 0 007.75 22h8.5A5.75 5.75 0 0022 16.25v-8.5A5.75 5.75 0 0016.25 2h-8.5zM12 8.25a3.75 3.75 0 110 7.5 3.75 3.75 0 010-7.5zm5.25-.75a.75.75 0 110 1.5.75.75 0 010-1.5zM12 9.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z',
      link: 'https://www.instagram.com/discountmithra?igsh=MXVuaWV4YXhpYmsyMQ%3D%3D&utm_source=qr',
    },
  ].map((item, index) => (
    <a href={item.link} target="_blank" rel="noopener noreferrer" key={index}>
      <motion.div
        variants={cardVariants}
        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)" }}
        className="p-6 bg-gray-800/60 rounded-xl shadow-lg border border-gray-700 backdrop-blur-md hover:border-blue-500 transition-all duration-300"
      >
        <svg
          className="w-10 h-10 text-blue-400 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
        </svg>
        <h3 className="text-xl font-bold text-white">{item.title}</h3>
        <p className="mt-2 text-gray-300">{item.value}</p>
      </motion.div>
    </a>
  ))}
</motion.div>

      </div>
    </section>
  );
};

export default ContactSection;