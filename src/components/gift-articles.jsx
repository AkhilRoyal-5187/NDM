// src/components/GiftCardsPage.jsx
import React, { useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import Note from './note';

// Data specifically for the Gift Cards Page (using the provided event-related details)
const giftCardsServices = [
    {
        id: 1,
        name: "Discountmithra Dream Events",
        image: '/assests/gift.webp',
        address: "Sircilla, 505301",
        Phone: "7799663223",
        offers: [
            "10% wedding planning",
            "25% DJ setup",
            "Combo decoration"
        ],
    },
    {
        id: 2,
        name: "Grand Flower Decoration",
        image: '/assests/gift.webp',
        address: "Shanthinagar",
        Phone: "7799663223",
        offers: [
            "20% birthday decor",
            "20% Wedding decor",
            "SPL Combo deals"
        ],
    },
    {
        id: 3,
        name: "Catering Deals",
        image: '/assests/gift.webp',
        address: "Gandhi Nagar",
        Phone: "7799663223",
        offers: [
            "10% Catering deal",
            "20% Catering boys",
            "Lights & sound offers"
        ],
    },
];

const GiftCardsPage = () => {
    // Scroll to top on component mount
    useLayoutEffect(() => {
        window.scrollTo(0, 0); // Scrolls to the top-left corner of the window
    }, []); // Empty dependency array ensures this runs only once after initial render

    // Animation variants
    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
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
                // Made text size responsive
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 text-center mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Gift Cards / Articles in Sircilla
            </motion.h1>
            <Note/>
            {/* Grid for services - Adjusted for responsiveness like ConstructionPage */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 justify-items-center">
                {giftCardsServices.map((service) => (
                    <motion.div
                        key={service.id}
                        variants={cardVariants}
                        whileHover={{
                            scale: 1.03,
                            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
                            transition: { duration: 0.3 },
                        }}
                        // Card wrapper: flex-col for mobile, flex-row for larger, min-height for content visibility
                        className="flex flex-col sm:flex-row rounded-xl shadow-lg text-left w-full sm:max-w-md min-h-[10rem] bg-gray-800/50 backdrop-blur-md border border-gray-700 mx-auto"
                    >
                        {/* Image section: sm:h-full ensures the image fills card height in horizontal layout */}
                        <div className="w-full h-32 sm:h-full sm:w-2/5 flex-shrink-0">
                            <motion.img
                                src={service.image}
                                alt={service.name}
                                className="w-full h-full object-cover rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none" // Rounded corners adjusted for layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                onError={(e) => { e.target.onerror = null; e.target.src = '/assests/gift.webp'; }}
                            />
                        </div>
                        {/* Content section: uses flex-grow to push button down, ensuring visibility */}
                        <div className="w-full sm:w-3/5 p-4 flex flex-col justify-between">
                            <div> {/* Retaining original structure here based on user feedback */}
                                <h3 className="font-bold text-xl text-white mb-1">{service.name}</h3>
                                <p className="text-gray-300 text-sm mb-2">Location: {service.address}</p>

                                {service.offers && (
                                    <ul className="text-gray-400 text-xs mt-1 list-disc list-inside flex-grow"> {/* flex-grow added to offers list */}
                                        {service.offers.map((offer, i) => (
                                            <li key={i}>{offer}</li>
                                        ))}
                                        {service.Phone && <li key="phone">Phone: {service.Phone}</li>}
                                    </ul>
                                )}
                            </div>
                            <motion.button
                                className="bg-gradient-to-r from-blue-400 to-purple-400 text-white text-sm px-6 py-2 rounded-full hover:scale-105 transition-transform duration-300 mt-auto self-start" // mt-auto for bottom alignment, self-start for left alignment
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Book Now
                            </motion.button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default GiftCardsPage;