"use client";
// import React from 'react';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import elephantImage from '../assests/elephant.png'
// import IconItem from '../components/IconItem';

// const HomePage = () => {
//   // Hero Section Variants (unchanged)
//   const leftVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: (i) => ({
//       opacity: 1,
//       y: 0,
//       transition: { delay: i * 0.2, duration: 0.6 },
//     }),
//   };

//   const gridVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.1 },
//     },
//   };

//   const iconVariants = {
//     hidden: { opacity: 0, scale: 0.8 },
//     visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
//   };

//   // Variants for other sections
//   const sectionVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
//   };

//   const cardVariants = {
//     hidden: { opacity: 0, scale: 0.9 },
//     visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
//   };

//   const inputVariants = {
//     hidden: { opacity: 0, x: -20 },
//     visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
//   };

//   return (
//     <div className="bg-gray-900 text-white min-h-screen">
//       {/* Hero Section (Unchanged) */}
//       <section className="relative w-full px-4 sm:px-6 lg:px-8 mt-8 mb-12 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 via-gray-900 to-black shadow-2xl backdrop-blur-lg transition-all duration-500">
//         <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20 pointer-events-none"></div>
//         <div className="relative max-w-7xl mx-auto py-8 sm:py-12 lg:py-16">
//           <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
//             {/* Left side */}
//             <motion.div
//               initial="hidden"
//               animate="visible"
//               variants={leftVariants}
//               custom={0}
//               className="text-center lg:text-left lg:w-1/2 space-y-6"
//             >
//               <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
//                 <img src={elephantImage} alt="Elephant" className="w-32 sm:w-40 h-auto mx-auto lg:mx-0 object-contain drop-shadow-xl" />
//               </motion.div>
//               <h3 className="text-2xl sm:text-3xl font-bold text-blue-400 font-inter">Welcome to Discount Mithra</h3>
//               <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
//                 Your Friendly <br /> <span className="text-white">Discount Companion</span>
//               </h2>
//               <p className="text-lg sm:text-xl text-gray-300 font-medium">
//                 Save on Hospitals, Restaurants, Groceries, Travel & More!
//               </p>
//             </motion.div>

//             {/* Icon Grid */}
//             <motion.div
//               initial="hidden"
//               animate="visible"
//               variants={gridVariants}
//               className="grid grid-cols-3 sm:grid-cols-4 gap-4 lg:w-1/2 p-6 bg-gray-800/50 rounded-xl shadow-inner backdrop-blur-md border border-gray-700"
//             >
//               {[
//                 { bgColor: "bg-red-100", iconColor: "text-red-500", hoverIconColor: "hover:text-red-600", label: "Hospital", svgPath: "M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" },
//                 { bgColor: "bg-orange-100", iconColor: "text-orange-500", hoverIconColor: "hover:text-orange-600", label: "Restaurant", svgPath: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" },
//                 { bgColor: "bg-green-100", iconColor: "text-green-500", hoverIconColor: "hover:text-green-600", label: "Groceries", svgPath: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" },
//                 { bgColor: "bg-purple-100", iconColor: "text-purple-500", hoverIconColor: "hover:text-purple-600", label: "Gifts", svgPath: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
//                 { bgColor: "bg-pink-100", iconColor: "text-pink-500", hoverIconColor: "hover:text-pink-600", label: "Salon", svgPath: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-2.414-2.414A1 1 0 0015.586 6H12V4a2 2 0 00-2-2H6a2 2 0 00-2 2v16a2 2 0 002 2z" },
//                 { bgColor: "bg-yellow-100", iconColor: "text-yellow-600", hoverIconColor: "hover:text-yellow-700", label: "Education", svgPath: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.747 0-3.332.477-4.5 1.253" },
//                 { bgColor: "bg-blue-100", iconColor: "text-blue-500", hoverIconColor: "hover:text-blue-600", label: "Travel", svgPath: "M3 10h4l3 7 4-14 3 7h4" },
//                 { bgColor: "bg-indigo-100", iconColor: "text-indigo-500", hoverIconColor: "hover:text-indigo-600", label: "Entertainment", svgPath: "M15 10l4.553 2.276a1 1 0 010 1.448L15 16" },
//                 { bgColor: "bg-teal-100", iconColor: "text-teal-500", hoverIconColor: "hover:text-teal-600", label: "Fitness", svgPath: "M12 22c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2s-2 .9-2 2v4c0 1.1.9 2 2 2z" }
//               ].map((item, index) => (
//                 <IconItem key={index} {...item} variants={iconVariants} />
//               ))}
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* About Section */}
//       <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <motion.div
//           initial="hidden"
//           animate="visible"
//           variants={sectionVariants}
//           className="text-center space-y-6"
//         >
//           <h2 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
//             About Discount Mithra
//           </h2>
//           <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
//             Discount Mithra is your trusted companion for unlocking incredible savings across hospitals, restaurants, travel, and more. Our mission is to make every experience affordable and delightful.
//           </p>
//         </motion.div>

//         <motion.div
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
//           initial="hidden"
//           animate="visible"
//           variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
//         >
//           {[
//             { title: 'Our Mission', description: 'Empowering users with unbeatable discounts.', icon: 'M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z' },
//             { title: 'Our Vision', description: 'Making savings accessible to everyone.', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
//             { title: 'Our Team', description: 'A passionate group dedicated to your savings.', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
//           ].map((item, index) => (
//             <motion.div
//               key={index}
//               variants={cardVariants}
//               className="p-6 bg-gray-800/50 rounded-xl shadow-inner border border-gray-700 backdrop-blur-md hover:shadow-xl transition-shadow"
//             >
//               <svg className="w-12 h-12 text-blue-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
//               </svg>
//               <h3 className="mt-4 text-xl font-bold text-white">{item.title}</h3>
//               <p className="mt-2 text-gray-300">{item.description}</p>
//             </motion.div>
//           ))}
//         </motion.div>

//         <motion.div
//           className="mt-12 text-center"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.6, duration: 0.6 }}
//         >
//           <Link
//             to="/membership"
//             className="inline-block px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-400 to-purple-400 rounded-full hover:scale-105 transition-transform duration-300"
//           >
//             Join Now
//           </Link>
//         </motion.div>
//       </section>

//       {/* Membership Section */}
//       <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <motion.div
//           initial="hidden"
//           animate="visible"
//           variants={sectionVariants}
//           className="text-center space-y-6"
//         >
//           <h2 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
//             Join Discount Mithra
//           </h2>
//           <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
//             Unlock exclusive discounts and premium benefits with our membership plans.
//           </p>
//         </motion.div>

//         <motion.div
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
//           initial="hidden"
//           animate="visible"
//           variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
//         >
//           {[
//             {
//               title: 'Basic Plan',
//               price: 'Free',
//               features: ['Access to basic discounts', 'Community support', 'Monthly newsletter'],
//               cta: 'Get Started',
//               link: '/signup',
//             },
//             {
//               title: 'Premium Plan',
//               price: '$9.99/mo',
//               features: ['Exclusive discounts', 'Priority support', 'Early access to deals'],
//               cta: 'Sign Up',
//               link: '/signup',
//             },
//             {
//               title: 'Family Plan',
//               price: '$19.99/mo',
//               features: ['All Premium benefits', 'Up to 5 accounts', 'Family-exclusive offers'],
//               cta: 'Join Now',
//               link: '/signup',
//             },
//           ].map((plan, index) => (
//             <motion.div
//               key={index}
//               variants={cardVariants}
//               className="p-6 bg-gray-800/50 rounded-xl shadow-inner border border-gray-700 backdrop-blur-md hover:shadow-xl transition-shadow"
//             >
//               <h3 className="text-2xl font-bold text-white">{plan.title}</h3>
//               <p className="mt-2 text-3xl font-extrabold text-blue-400">{plan.price}</p>
//               <ul className="mt-4 space-y-2 text-gray-300">
//                 {plan.features.map((feature, i) => (
//                   <li key={i} className="flex items-center">
//                     <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                     </svg>
//                     {feature}
//                   </li>
//                 ))}
//               </ul>
//               <Link
//                 to={plan.link}
//                 className="mt-6 inline-block px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-400 to-purple-400 rounded-full hover:scale-105 transition-transform duration-300"
//               >
//                 {plan.cta}
//               </Link>
//             </motion.div>
//           ))}
//         </motion.div>
//       </section>

//       {/* Contact Section */}
//       <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <motion.div
//           initial="hidden"
//           animate="visible"
//           variants={sectionVariants}
//           className="text-center space-y-6"
//         >
//           <h2 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
//             Get in Touch
//           </h2>
//           <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
//             Have questions? Reach out to our team, and we'll get back to you promptly!
//           </p>
//         </motion.div>

//         <motion.div
//           className="mt-12 max-w-lg mx-auto bg-gray-800/50 p-8 rounded-xl shadow-inner border border-gray-700 backdrop-blur-md"
//           initial="hidden"
//           animate="visible"
//           variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
//         >
//           <form className="space-y-6">
//             <motion.div variants={inputVariants}>
//               <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
//               <input
//                 type="text"
//                 id="name"
//                 className="mt-1 w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-400"
//                 placeholder="Your Name"
//               />
//             </motion.div>
//             <motion.div variants={inputVariants}>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 className="mt-1 w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-400"
//                 placeholder="Your Email"
//               />
//             </motion.div>
//             <motion.div variants={inputVariants}>
//               <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
//               <textarea
//                 id="message"
//                 rows="4"
//                 className="mt-1 w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-400"
//                 placeholder="Your Message"
//               ></textarea>
//             </motion.div>
//             <motion.div variants={inputVariants}>
//               <button
//                 type="submit"
//                 className="w-full px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-400 to-purple-400 rounded-full hover:scale-105 transition-transform duration-300"
//               >
//                 Send Message
//               </button>
//             </motion.div>
//           </form>
//         </motion.div>

//         <motion.div
//           className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12"
//           initial="hidden"
//           animate="visible"
//           variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
//         >
//           {[
//             { title: 'Email', value: 'support@discountmithra.com', icon: 'M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' },
//             { title: 'Phone', value: '+1-800-123-4567', icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' },
//             { title: 'Social', value: '@DiscountMithra', icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
//           ].map((item, index) => (
//             <motion.div
//               key={index}
//               variants={cardVariants}
//               className="p-6 bg-gray-800/50 rounded-xl shadow-inner border border-gray-700 backdrop-blur-md"
//             >
//               <svg className="w-8 h-8 text-blue-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
//               </svg>
//               <h3 className="mt-4 text-lg font-bold text-white">{item.title}</h3>
//               <p className="mt-2 text-gray-300">{item.value}</p>
//             </motion.div>
//           ))}
//         </motion.div>
//       </section>
//     </div>
//   );
// };

// export default HomePage;
import React from 'react';
import { motion } from 'framer-motion';
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
  { bgColor: "bg-red-100", iconColor: "text-red-500", hoverIconColor: "hover:text-red-600", label: "Hospital", Icon: FaHospital },
  { bgColor: "bg-orange-100", iconColor: "text-orange-500", hoverIconColor: "hover:text-orange-600", label: "Restaurant", Icon: GiKnifeFork },
  { bgColor: "bg-green-100", iconColor: "text-green-500", hoverIconColor: "hover:text-green-600", label: "Groceries", Icon: FaShoppingBasket },
  { bgColor: "bg-purple-100", iconColor: "text-purple-500", hoverIconColor: "hover:text-purple-600", label: "Gifts", Icon: FaGift },
  { bgColor: "bg-pink-100", iconColor: "text-pink-500", hoverIconColor: "hover:text-pink-600", label: "Salon", Icon: FaCut },
  { bgColor: "bg-yellow-100", iconColor: "text-yellow-600", hoverIconColor: "hover:text-yellow-700", label: "Education", Icon: FaGraduationCap },
  { bgColor: "bg-blue-100", iconColor: "text-blue-500", hoverIconColor: "hover:text-blue-600", label: "Travel", Icon: FaPlaneDeparture },
  { bgColor: "bg-indigo-100", iconColor: "text-indigo-500", hoverIconColor: "hover:text-indigo-600", label: "Entertainment", Icon: FaFilm },
  { bgColor: "bg-teal-100", iconColor: "text-teal-500", hoverIconColor: "hover:text-teal-600", label: "Fitness", Icon: FaDumbbell },
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
      <section className="relative w-full px-4 sm:px-6 lg:px-8 mt-8 mb-12 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 via-gray-900 to-black shadow-2xl backdrop-blur-lg transition-all duration-500">
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
              {iconItems.map(({ bgColor, iconColor, hoverIconColor, label, Icon }, index) => (
                <motion.div
                  key={index}
                  variants={iconVariants}
                  className={`${bgColor} rounded-lg p-4 flex flex-col items-center cursor-pointer shadow-md transition-shadow duration-300`}
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0 8px 15px rgba(0,0,0,0.3)",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <Icon
                    className={`w-10 h-10 ${iconColor} ${hoverIconColor} transition-colors duration-300`}
                  />
                  <span className="mt-2 text-white font-semibold">{label}</span>
                </motion.div>
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