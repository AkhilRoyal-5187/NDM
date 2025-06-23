// src/app/api/admin/login/route.js
import { NextResponse } from 'next/server';
const connectDB = require('../../../../lib/db'); // Adjust path if needed
const Admin = require('../../../../models/Admin'); // Adjust path if needed
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

export async function POST(request) {
  await connectDB(); // Ensure DB connection before handling request

  try {
    const { username, password } = await request.json();

    // --- ADDED CONSOLE.LOGS START ---
    console.log('--- Admin Login Attempt ---');
    console.log('Frontend provided username:', username);
    console.log('Frontend provided password (length):', password.length); // DO NOT log the password itself
    // --- ADDED CONSOLE.LOGS END ---

    const admin = await Admin.findOne({ username });

    if (!admin) {
      // --- ADDED CONSOLE.LOGS START ---
      console.log(`Admin user '${username}' NOT FOUND in database.`);
      // --- ADDED CONSOLE.LOGS END ---
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // --- ADDED CONSOLE.LOGS START ---
    console.log(`Admin user '${admin.username}' found in database.`);
    // --- ADDED CONSOLE.LOGS END ---

    const isMatch = await bcrypt.compare(password, admin.password);

    // --- ADDED CONSOLE.LOGS START ---
    console.log(`Password comparison result for '${username}':`, isMatch);
    // --- ADDED CONSOLE.LOGS END ---

    if (!isMatch) {
      // --- ADDED CONSOLE.LOGS START ---
      console.log(`Password MISMATCH for user: '${username}'.`);
      // --- ADDED CONSOLE.LOGS END ---
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    // --- ADDED CONSOLE.LOGS START ---
    console.log(`Login SUCCESS for user: '${username}'.`);
    // --- ADDED CONSOLE.LOGS END ---

    return NextResponse.json(
      {
        message: 'Login successful',
        token,
        admin: { id: admin._id, username: admin.username, role: admin.role },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Admin login API Route ERROR:', error); // This one was already there, good!
    return NextResponse.json(
      {
        message: 'Error during admin login',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}