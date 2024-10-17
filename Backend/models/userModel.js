// models/userModel.js
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/campuscabs')
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
  password: { type: String, required: true },
  phone: { type: String, required: true },
  rideHistory: [rideSchema] // Array of ride history
});

module.exports = mongoose.model('User', userSchema);
