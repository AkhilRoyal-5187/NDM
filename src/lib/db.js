// src/lib/db.js
const mongoose = require('mongoose');
// const Admin = require('../models/Admin'); // <<< REMOVE THIS LINE (it was for debugging)

let isConnected = false; // Flag to check connection status

const connectDB = async () => {
  if (isConnected) {
    console.log('Using existing database connection');
    return;
  }

  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI environment variable is not defined.');
    }

    await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'test', // Keep this, as it's the correct database
    });

    isConnected = true;
    console.log('MongoDB connected successfully');

    // --- REMOVE THE TEMPORARY TEST QUERY BLOCK BELOW ---
    // console.log('--- Running temporary Admin.findOne test ---');
    // const testAdmin = await Admin.findOne({ username: 'id' });
    // if (testAdmin) {
    //   console.log('TEST: Admin "id" found directly after connection!');
    //   console.log('TEST: Admin password starts with:', testAdmin.password.substring(0, 10), '...');
    // } else {
    //   console.log('TEST: Admin "id" NOT FOUND after connection! (Model issue or data still missing)');
    // }
    // console.log('--- End temporary Admin.findOne test ---');
    // --- END TEMPORARY TEST QUERY BLOCK ---

  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Failed to connect to MongoDB');
  }
};

module.exports = connectDB;