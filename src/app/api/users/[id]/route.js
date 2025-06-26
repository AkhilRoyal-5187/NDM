// src/app/api/users/[id]/route.js
import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/db'; // Corrected path: 4 levels up to src, then into lib
import User from '../../../../models/User';   // Corrected path: 4 levels up to src, then into models

export async function GET(_request, { params }) {
  await connectDB();
  try {
    const { id } = params;
    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    return NextResponse.json({ message: 'Error fetching user', error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  await connectDB();
  try {
    const { id } = await params; // <--- This was the previous crucial fix for the "params" error

    const body = await request.json();
    const {
      idNo,
      cardHolderName,
      familyName,
      Family2,
      Family3,
      Family4,
      Family5,
      phoneNumber,
      validTill
    } = body;

    const updateFields = {
      idNo,
      cardHolderName,
      familyName,
      Family2,
      Family3,
      Family4,
      Family5,
      phoneNumber,
      validTill
    };

    const updatedUser = await User.findByIdAndUpdate(
      id,
      updateFields,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found or no changes made' }, { status: 404 });
    }

    return NextResponse.json(updatedUser);

  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      {
        message: 'Error updating user',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      },
      { status: 500 }
    );
  }
}

export async function DELETE(_request, { params }) {
  await connectDB();
  try {
    const { id } = await params; // <--- This was the previous crucial fix for the "params" error
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ message: 'Error deleting user', error: error.message }, { status: 500 });
  }
}