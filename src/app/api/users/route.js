// src/app/api/users/route.js
import { NextResponse } from 'next/server';
import connectDB from '../../../lib/db';
import User from '../../../models/User';

// GET all users
export async function GET(_request) {
  await connectDB();

  try {
    console.log('Fetching all users...');
    const users = await User.find().sort({ createdAt: -1 });
    console.log(`Found ${users.length} users`);
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      {
        message: 'Error fetching users',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}

// Create a new user
export async function POST(request) {
  await connectDB();

  try {
    const {
      idNo,
      cardHolderName,
      familyName,
      family2,
      family3,
      family4,
      family5,
      phoneNumber,
      password, // <--- ADD THIS LINE TO DESTRUCTURE PASSWORD
      validTill
    } = await request.json(); // Use request.json() for Next.js App Router

    console.log('Creating new user:', { idNo, cardHolderName, phoneNumber, password: '***' }); // Log securely

    const existingUser = await User.findOne({ $or: [{ idNo }, { phoneNumber }] });
    if (existingUser) {
      return NextResponse.json(
        {
          message: 'A user with this ID or phone number already exists',
          field: existingUser.idNo === idNo ? 'idNo' : 'phoneNumber',
        },
        { status: 400 }
      );
    }

    const user = new User({
      idNo,
      cardHolderName,
      familyName,
      family2: family2 || '',
      family3: family3 || '',
      family4: family4 || '',
      family5: family5 || '',
      phoneNumber,
      password, // <--- PASS THE DESTRUCTURED PASSWORD HERE
      validTill: new Date(validTill)
    });
    await user.save(); // Mongoose validates, then pre('save') hook hashes

    console.log('User created successfully:', user._id);
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      {
        message: 'Error creating user',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}