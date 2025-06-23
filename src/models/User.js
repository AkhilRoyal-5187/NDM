// src/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  idNo: { type: String, required: true, unique: true },
  cardHolderName: { type: String, required: true },
  familyName: { type: String, required: true },
  family2: { type: String, default: '' },
  family3: { type: String, default: '' },
  family4: { type: String, default: '' },
  family5: { type: String, default: '' },
  phoneNumber: { type: String, required: true, unique: true },
  validTill: { type: Date, required: true },
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);