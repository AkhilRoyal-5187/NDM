// src/models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  idNo: { type: String, required: true, unique: true },
  cardHolderName: { type: String, required: true },
  familyName: { type: String, required: true },
  family2: { type: String, default: '' },
  family3: { type: String, default: '' },
  family4: { type: String, default: '' },
  family5: { type: String, default: '' },
  phoneNumber: { type: String, required: true, unique: true }, // User's login ID
  password: { type: String, required: true }, // User's password (will be their hashed phone number)
  validTill: { type: Date, required: true },
}, {
  timestamps: true
});

// IMPORTANT: Password Hashing Pre-Save Hook
UserSchema.pre('save', async function(next) {
  // Only hash the password if:
  // 1. The 'password' field itself has been modified (e.g., admin explicitly provides a new password, though not in this specific flow)
  // 2. OR the 'phoneNumber' field has been modified (because phoneNumber IS the password)
  if (!this.isModified('password') && !this.isModified('phoneNumber')) {
    return next();
  }

  // If the phoneNumber has changed or the password field itself is being set/updated,
  // ensure the 'password' field stores the current 'phoneNumber' value before hashing.
  // This ensures consistency with the "phone number as password" rule.
  if (this.isModified('phoneNumber') || (this.isNew && this.password !== this.phoneNumber)) {
    this.password = this.phoneNumber;
  }
  
  // Generate a salt and hash the password (which is now guaranteed to be the phoneNumber)
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare password (for login)
UserSchema.methods.matchPassword = async function(enteredPassword) {
  // Compare the plain text enteredPassword with the hashed password in the database
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.models.User || mongoose.model('User', UserSchema);