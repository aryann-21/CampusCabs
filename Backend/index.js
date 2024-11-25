const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const userModel = require('./models/userModel.js');

// const twilio = require('twilio');

const app = express();

// CORS setup to allow requests from frontend
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Twilio setup
// const accountSid = process.env.SID;  // Replace with your Twilio Account SID
// const authToken = process.env.AUTH_TOKEN;   // Replace with your Twilio Auth Token
// const client = twilio(accountSid, authToken);

app.post('/send-whatsapp', (req, res) => {
  const { name, email, message, driverName, driverPhone, cabNumber, dropLocation, date, time, numberOfPeople, payment, uName, uPhone } = req.body;

  // If ride details and driver phone number are provided, send the ride details to the driver
  if (driverPhone) {
    const rideMessage = `
      🚗 *Ride Confirmation* 🚗

      🧑‍✈️ *Driver Name:* ${driverName}
      🚖 *Cab Number:* ${cabNumber}

      🧑‍✈️ *passenger Name:* ${uName}
      📞 *Passenger Phone:* ${uPhone}
      
      📍 *Drop Location:* ${dropLocation}
      📅 *Pickup Date:* ${date}
      🕑 *Pickup Time:* ${time}
      👥 *Number of People:* ${numberOfPeople}
      💸 *Total Fare:* Rs ${payment}/-
      
      🚨 *Important Details:*
      - Please be on time for the pickup.
      - Confirm the number of passengers and the correct pickup location.

      Thank you for driving with us! 👍
    `;

    // Send message to the driver on WhatsApp
    client.messages.create({
      body: rideMessage,
      from: `whatsapp:${phoneNumber}`,  // Your Twilio WhatsApp-enabled number
      to: `whatsapp:+91${driverPhone}`,   // Driver's phone number with country code
    })
      .then(() => {
        console.log('Ride details sent to the driver.');
        res.status(200).send('Message sent successfully!');
      })
      .catch((error) => {
        console.error('Error sending ride details:', error);
      });
  }

  // If contact form details are provided, send the contact form to your WhatsApp
  if (message !== 'debugging' && name !== 'debugger' && email) {
    const contactMessage = `
      New Contact Form Submission:

      Name: ${name}
      Email: ${email}
      Message: ${message}
    `;

    // Send contact form details to your WhatsApp
    client.messages.create({
      body: contactMessage,
      from: `whatsapp:${phoneNumber}`,  // Your Twilio WhatsApp-enabled number
      to: 'whatsapp:+918690892181',     // Your personal WhatsApp number
    })
      .then(() => {
        console.log('Contact form message sent to you.');
        res.status(200).send('Message sent successfully!');
      })
      .catch((error) => {
        console.error('Error sending contact form message:', error);
        res.status(500).send('Error sending message');
      });
  }
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
    res.status(201).json({ message: 'User registered successfully', name: user.name, email: user.email, phone: user.phone });
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
      phone: user.phone,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
});

// Save ride to user's history without authentication
app.post('/save-ride-history', async (req, res) => {
  const { email, dropLocation, date, time, payment } = req.body;  // Assuming email is passed to identify the user

  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.rideHistory.push({ dropLocation, date, time, payment });
    await user.save();

    res.status(200).json({ message: 'Ride history updated', rideHistory: user.rideHistory });
  } catch (error) {
    res.status(500).json({ message: 'Error saving ride history' });
  }
});

app.get('/ride-history/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const rideHistory = user.rideHistory;

    if (!rideHistory || rideHistory.length === 0) {
      return res.status(404).json({ message: 'No ride history available' });
    }

    res.status(200).json(rideHistory);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ride history' });
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
