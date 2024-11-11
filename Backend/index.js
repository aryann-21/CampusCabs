const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const userModel = require('./models/userModel.js');

const twilio = require('twilio');

const app = express();

// CORS setup to allow requests from frontend
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Twilio setup
const accountSid = 'ACd5c713f0f7443b568de29ebab5e81207';  // Replace with your Twilio Account SID
const authToken = '0186d3ebd796757f441402c0f872413b';   // Replace with your Twilio Auth Token
const client = twilio(accountSid, authToken);

app.post('/send-whatsapp', (req, res) => {
  const { name, email, message } = req.body;

  client.messages
    .create({
      body: `New Contact Form Submission:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
      from: 'whatsapp:+14155238886',  // Your Twilio WhatsApp-enabled number
      to: 'whatsapp:+918690892181',     // Your personal WhatsApp number (replace with your number)
    })
    .then((message) => {
      console.log(message.sid);
      res.status(200).send('Message sent successfully!');
    })
    .catch((error) => {
      console.error('Error sending message:', error);
      res.status(500).send('Error sending message');
    });
});

// Register a new user
app.post('/signup', async (req, res) => {
  const { name, email, password, phone } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already registered' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    const token = jwt.sign({ email: user.email, userid: user._id }, 'secret');
    res.cookie('token', token);
    res.status(201).json({ message: 'User registered successfully', name: user.name, email: user.email });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
});

// User login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ email: user.email, userid: user._id }, 'secret');
    res.cookie('token', token);

    res.status(200).json({
      message: 'Login successful',
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
});

// Save ride to user's history without authentication
app.post('/save-ride-history', async (req, res) => {
  const { email, dropLocation, date, time, payment } = req.body;  // Assuming email is passed to identify the user

  try {
    // Find the user by their email
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Add the ride to the user's ride history
    user.rideHistory.push({ dropLocation, date, time, payment });
    await user.save();

    res.status(200).json({ message: 'Ride history updated', rideHistory: user.rideHistory });
  } catch (error) {
    res.status(500).json({ message: 'Error saving ride history' });
  }
});

// User logout
app.get('/logout', (req, res) => {
  res.cookie('token', '');
  res.status(200).json({ message: 'Logged out successfully' });
});

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
