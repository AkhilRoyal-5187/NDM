import React from 'react';
import { motion } from 'framer-motion';

const Note = () => {
    return (
        <motion.div
            className="bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500 p-4 rounded-md shadow-md mb-6 max-w-3xl mx-auto text-sm sm:text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <p>
                <strong>Note:</strong> Please contact owners while booking.
            </p>
        </motion.div>
    );
};

export default Note;
