// models/userModel.js
const mongoose = require('mongoose');

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/campuscabs';
mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  bufferMaxEntries: 0, // Disable mongoose buffering
  bufferCommands: false, // Disable mongoose buffering
})
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("MongoDB connection error: ", err));

const rideSchema = new mongoose.Schema({
  dropLocation: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  payment: { type: Number, required: true }
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Made optional for Google users
  phone: { type: String }, // Made optional for Google users
  googleId: { type: String, unique: true, sparse: true }, // Google ID for OAuth
  profilePicture: { type: String }, // Profile picture URL
  isGoogleUser: { type: Boolean, default: false }, // Flag to identify Google users
  rideHistory: [rideSchema] // Array of ride history
});

module.exports = mongoose.model('User', userSchema);
