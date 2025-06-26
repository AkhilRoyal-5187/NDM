// src/app/api/user/login/route.js
import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/db'; // Adjust path as needed
import User from '../../../../models/User';   // Adjust path as needed
import jwt from 'jsonwebtoken';

export async function POST(request) {
  await connectDB();

  try {
    const { phoneNumber, password } = await request.json();

    if (!phoneNumber || !password) {
      return NextResponse.json({ success: false, message: 'Please enter phone number and password' }, { status: 400 }); // ADD success: false
    }

    console.log(`--- User Login Attempt ---`);
    console.log(`Frontend provided phone number: ${phoneNumber}`);

    const user = await User.findOne({ phoneNumber });

    if (!user) {
      console.log(`User with phone number '${phoneNumber}' not found.`);
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 }); // ADD success: false
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      console.log(`Password comparison failed for user: ${phoneNumber}`);
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 }); // ADD success: false
    }

    const token = jwt.sign(
      { id: user._id, role: 'user' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log(`Login SUCCESS for user: '${phoneNumber}'.`);
    return NextResponse.json(
      {
        success: true, // <--- ADD THIS LINE FOR SUCCESS
        message: 'Login successful',
        token,
        user: { id: user._id, phoneNumber: user.phoneNumber, name: user.cardHolderName }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error during user login:', error);
    return NextResponse.json(
      {
        success: false, // ADD success: false for server errors too
        message: 'Internal server error during login',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}