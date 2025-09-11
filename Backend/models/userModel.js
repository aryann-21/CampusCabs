// models/userModel.js
const mongoose = require('mongoose');

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/campuscabs';

// Simple connection for Vercel serverless
mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 10000, // 10 seconds timeout
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
})
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("MongoDB connection error: ", err));

// Add connection event listeners
mongoose.connection.on('connected', () => {
  console.log('MongoDB connected event fired');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error event:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected event fired');
});

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
