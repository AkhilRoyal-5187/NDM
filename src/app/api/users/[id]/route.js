// src/app/api/users/[id]/route.js
import { NextResponse } from 'next/server';
const connectDB = require('../../../../lib/db'); // Adjust path
const User = require('../../../../models/User');   // Adjust path
const { authenticateToken } = require('../../../../middleware/auth'); // Adjust path

// Helper function for PUT (Update)
const handlePut = async (request, context) => {
  await connectDB(); // Ensure DB connection

  try {
    const { id } = context.params; // Get ID from context.params in dynamic routes
    const {
      cardHolderName,
      familyName,
      family2,
      family3,
      family4,
      family5,
      phoneNumber,
      validTill
    } = await request.json();

    // Check for duplicate phoneNumber (excluding current user)
    const existingUser = await User.findOne({ phoneNumber, _id: { $ne: id } });
    if (existingUser) {
      return NextResponse.json(
        {
          message: 'A user with this phone number already exists',
          field: 'phoneNumber',
        },
        { status: 400 }
      );
    }

    const user = await User.findByIdAndUpdate(
      id,
      {
        cardHolderName,
        familyName,
        family2: family2 || '',
        family3: family3 || '',
        family4: family4 || '',
        family5: family5 || '',
        phoneNumber,
        validTill: new Date(validTill)
      },
      { new: true } // Returns the updated document
    );

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      {
        message: 'Error updating user',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
};

// Helper function for DELETE
const handleDelete = async (request, context) => {
  await connectDB(); // Ensure DB connection

  try {
    const { id } = context.params; // Get ID from context.params

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      {
        message: 'Error deleting user',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
};

// Export the handlers, wrapped with authentication middleware
export const PUT = authenticateToken(handlePut);
export const DELETE = authenticateToken(handleDelete);