import React from "react";
import { motion } from "framer-motion";
import Note from "./note";
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook
import { useRouter } from 'next/navigation'; // Import useRouter for redirection

const CarServices = [
  // ... (Your existing CarServices data) ...
  {
    id: 1,
    name: "Car Repair Pro",
    image: "/assests/car_repair.avif",
    location: "Old Petrol Bunk",

    Discounts: {
      d1: "20% on labor",
      d2: "10% on spares",
      d3: "10% on packages",
    },
    phone: "7799663223", // This is the service provider's phone number
  },
  {
    id: 2,
    name: "Bike Repair Hub",
    image: "/assests/car_repair.avif",
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
    image: "/assests/car_repair.avif",
    location: "Karimnagar Road",
    Discounts: {
      d1: "Up to 20% off",
    },
    phone: "7799663223",
  },
  {
    id: 4,
    name: "Sri manjunatha hydralic water sarwising center",
    image: "/assests/car_repair.avif",
    location: "Srinagar Colany,Karimnagar Road",
    Discounts: {
      d1: "Up to 150 off",
    },
    phone: "7799663223",
  },
  {
    id: 5,
    name: "Sridurga battery",
    image: "/assests/car_repair.avif",
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
    image: "/assests/car_repair.avif",
    location: "soon",
    Discounts: {
      d1: " Up to 50% off",
    },
    phone: "7799663223",
  },
];

const CarServiceCards = () => {
  const { isLoggedIn, userPhoneNumber, login } = useAuth(); // Destructure from the auth context
  const router = useRouter();

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

  const handleBookNow = (serviceProviderPhone) => {
    if (isLoggedIn) {
      // User is logged in, now you can perform the booking action.
      // This will likely involve making an API call to your backend.
      // For now, let's just log it:
      console.log(
        `User ${userPhoneNumber} is trying to book service with provider ${serviceProviderPhone}`
      );
      alert(`Booking request sent to ${serviceProviderPhone} by ${userPhoneNumber}. (This is a placeholder action)`);

      // TODO: Implement actual API call to your backend for booking
      // Example:
      // axios.post('/api/book-service', {
      //   userId: userPhoneNumber, // User's ID is their phone number
      //   serviceProviderPhone: serviceProviderPhone,
      //   serviceName: services.name, // Pass relevant details
      //   // ... other booking details
      // })
      // .then(response => {
      //   alert('Booking successful!');
      // })
      // .catch(error => {
      //   console.error('Booking failed:', error);
      //   alert('Booking failed. Please try again.');
      // });

    } else {
      // User is not logged in, redirect to login page
      alert("Please log in to book this service.");
      router.push('/login'); // Assuming you have a /login page for users
    }
  };

  return (
    <motion.div
      className="bg-gray-900 min-h-screen text-white p-6 space-y-8 w-full"      initial="hidden"
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
        {CarServices.map((service) => ( // Changed 'services' to 'service' for clarity in map
          <motion.div
            key={service.id}
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
                src={service.image}
                alt={service.name}
                className="w-24 h-24 object-cover rounded-md"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />
              <div>
                <h3 className="font-bold text-xl text-white">
                  {service.name}
                </h3>
                <p className="text-gray-300 text-sm">
                  location : {service.location}
                </p>
                <p className="text-l font-bold">Discounts:</p>
                <ul className="text-gray-400 text-xs mt-1 list-disc ml-4">
                  {Object.values(service.Discounts).map((discount, idx) => (
                    <li key={idx}>{discount}</li>
                  ))}
                </ul>
                {service.phone && (
                  <p className="text-gray-400 text-xs mt-1">
                    📞 {service.phone}
                  </p>
                )}
              </div>
            </div>

            {/* Book Now Button */}
            <motion.button
              onClick={() => handleBookNow(service.phone)} // Pass the service provider's phone
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