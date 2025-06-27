// src/components/BarPage.jsx
"use client";
import React, { useLayoutEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Note from './note';

const barServices = [
    {
        id: 1,
        name: "Sri Vinayaka Bar & Restaurant",
        image: '/assests/bar.webp',
        address: "Gopal Nagar, Sircilla",
        Phone: "7799663223", // This is the number to which the message will be sent (Business owner)
        offers: [
            "5% discount on Bar",
            "10% discount on Restaurant"
        ],
    },
];

const BarPage = () => {
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [bookingStatus, setBookingStatus] = useState(null); // 'idle', 'loading', 'success', 'error'
    const [bookingMessage, setBookingMessage] = useState(''); // Message to display to the user

    const handleBookNow = async (serviceName, servicePhoneNumber) => {
        setBookingStatus('loading');
        setBookingMessage('Sending booking request...');

        // --- IMPORTANT: Replace with actual logged-in user data ---
        // In a real application, you'd get this from your authentication context (e.g., NextAuth.js session)
        const userName = "Praveen Makka"; // Placeholder for logged-in user's name
        const userPhoneNumber = "+918985114785"; // Placeholder for logged-in user's phone number
                                                 // (Make sure this is VERIFIED in Twilio for trial account testing)
        // --- End of IMPORTANT section ---


        try {
            const response = await fetch('/api/book-service', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ serviceName, servicePhoneNumber, userName, userPhoneNumber }),
            });

            const data = await response.json();

            if (response.ok) {
                setBookingStatus('success');
                setBookingMessage(`Booking for "${serviceName}" confirmed! A confirmation SMS has been sent to you. The business owner will contact you shortly.`);
                setTimeout(() => {
                    setBookingStatus(null);
                    setBookingMessage('');
                }, 7000); // Give user more time to read confirmation
            } else {
                setBookingStatus('error');
                setBookingMessage(`Failed to book "${serviceName}": ${data.message || 'Unknown error'}.`);
            }
        } catch (error) {
            console.error('Error during booking:', error);
            setBookingStatus('error');
            setBookingMessage(`An error occurred while booking "${serviceName}". Please try again.`);
        }
    };


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
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 text-center mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Bars & Restaurants in Sircilla
            </motion.h1>
            <Note/>

            {/* Booking Status Message */}
            {bookingMessage && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-3 rounded-md text-center text-sm font-medium ${
                        bookingStatus === 'success' ? 'bg-green-500 text-white' :
                        bookingStatus === 'error' ? 'bg-red-500 text-white' :
                        'bg-blue-500 text-white'
                    } max-w-xl mx-auto mb-4`}
                >
                    {bookingMessage}
                </motion.div>
            )}

            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 justify-items-center">
                {barServices.map((service) => (
                    <motion.div
                        key={service.id}
                        variants={cardVariants}
                        whileHover={{
                            scale: 1.03,
                            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
                            transition: { duration: 0.3 },
                        }}
                        className="flex flex-col sm:flex-row rounded-xl shadow-lg text-left w-full sm:max-w-md min-h-[10rem] bg-gray-800/50 backdrop-blur-md border border-gray-700 mx-auto"
                    >
                        <div className="w-full h-32 sm:h-full sm:w-2/5 flex-shrink-0">
                            <motion.img
                                src={service.image}
                                alt={service.name}
                                className="w-full h-full object-cover rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                onError={(e) => { e.target.onerror = null; e.target.src = '/assests/bar.webp'; }}
                            />
                        </div>
                        <div className="w-full sm:w-3/5 p-4 flex flex-col justify-between">
                            <h3 className="font-bold text-xl text-white mb-1">{service.name}</h3>
                            <p className="text-gray-300 text-sm mb-2">Location: {service.address}</p>

                            {service.offers && (
                                <ul className="text-gray-400 text-xs mt-1 list-disc list-inside flex-grow">
                                    {service.offers.map((offer, i) => (
                                        <li key={i}>{offer}</li>
                                    ))}
                                    {service.Phone && <li key="phone">Phone: {service.Phone}</li>}
                                </ul>
                            )}
                            <motion.button
                                className="bg-gradient-to-r from-blue-400 to-purple-400 text-white text-sm px-6 py-2 rounded-full hover:scale-105 transition-transform duration-300 mt-auto self-start"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleBookNow(service.name, service.Phone)}
                                disabled={bookingStatus === 'loading'}
                            >
                                {bookingStatus === 'loading' ? 'Booking...' : 'Book Now'}
                            </motion.button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default BarPage;