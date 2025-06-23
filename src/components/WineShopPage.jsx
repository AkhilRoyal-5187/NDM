import React, { useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import wine from '../assests/wine.webp';
import Note from './note';

const wineShopServices = [
    {
        id: 1,
        name: "Wines (Coming Soon)",
        image: wine,
        address: "Coming Soon",
        Phone: "7799663223",
        offers: [
            "3% bottle discount."
        ],
    },
];

const WineShopPage = () => {
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
            className="bg-gray-900 min-h-screen text-white p-6 space-y-8 max-w-4xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
        >
            <motion.h1
                // Made text size responsive for better readability on different screen sizes
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 text-center mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Wine Shops in Sircilla
            </motion.h1>
            <Note/>

            {/* Services Grid - Configured for responsiveness and consistent height */}
            {/* Using a grid to handle responsive columns and justify-items-center to center cards */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 justify-items-center">
                {wineShopServices.map((service) => (
                    <motion.div
                        key={service.id}
                        variants={cardVariants}
                        whileHover={{
                            scale: 1.03,
                            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
                            transition: { duration: 0.3 },
                        }}
                        // Card wrapper: Stacks content vertically on small screens, then horizontally on larger ones
                        // `min-h-[10rem]` allows content to expand, preventing clipping
                        className="flex flex-col sm:flex-row rounded-xl shadow-lg text-left w-full sm:max-w-md min-h-[10rem] bg-gray-800/50 backdrop-blur-md border border-gray-700 mx-auto"
                    >
                        {/* Image section: Adapts its dimensions based on screen size */}
                        {/* `sm:h-full` ensures the image fills the card's height in horizontal layout */}
                        <div className="w-full h-32 sm:h-full sm:w-2/5 flex-shrink-0">
                            <motion.img
                                src={service.image}
                                alt={service.name}
                                // Adjusted border-radius for seamless look in both stacked and side-by-side layouts
                                className="w-full h-full object-cover rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                onError={(e) => { e.target.onerror = null; e.target.src = wine; }}
                            />
                        </div>
                        {/* Content section: Uses flex properties to arrange text and button */}
                        <div className="w-full sm:w-3/5 p-4 flex flex-col justify-between">
                            <h3 className="font-bold text-xl text-white mb-1">{service.name}</h3>
                            <p className="text-gray-300 text-sm mb-2">Location: {service.address}</p>

                            {service.offers && (
                                // `flex-grow` allows the offers list to take available space, pushing the button down
                                <ul className="text-gray-400 text-xs mt-1 list-disc list-inside flex-grow">
                                    {service.offers.map((offer, i) => (
                                        <li key={i}>{offer}</li>
                                    ))}
                                    {service.Phone && <li key="phone">Phone: {service.Phone}</li>}
                                </ul>
                            )}
                            {/* Book Now Button: `mt-auto` pushes it to the bottom, `self-start` aligns it left */}
                            <motion.button
                                className="bg-gradient-to-r from-blue-400 to-purple-400 text-white text-sm px-6 py-2 rounded-full hover:scale-105 transition-transform duration-300 mt-auto self-start"
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

export default WineShopPage;