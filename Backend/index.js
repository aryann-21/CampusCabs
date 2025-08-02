require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { OAuth2Client } = require('google-auth-library');
const userModel = require('./models/userModel.js');

// const twilio = require('twilio');

const app = express();

// CORS setup to allow requests from frontend
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://campuscabs-frontend.vercel.app', 'https://campuscabs-frontend.vercel.app/']
    : true, // Allow all origins in development
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Initialize Google OAuth client
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Twilio setup
// const accountSid = process.env.SID;  // Replace with your Twilio Account SID
// const authToken = process.env.AUTH_TOKEN;   // Replace with your Twilio Auth Token
// const client = twilio(accountSid, authToken);

// Google OAuth Routes
app.post('/api/auth/google', async (req, res) => {
  try {
    const { userInfo, accessToken, credential } = req.body;

    let userData;

    // Handle new format (userInfo + accessToken)
    if (userInfo && accessToken) {
      userData = {
        email: userInfo.email,
        name: userInfo.name,
        picture: userInfo.picture,
        googleId: userInfo.id
      };
    }
    // Handle old format (credential)
    else if (credential) {
      // Verify the Google token
      const ticket = await googleClient.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID
      });

      const payload = ticket.getPayload();
      userData = {
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
        googleId: payload.sub
      };
    }
    else {
      return res.status(400).json({ success: false, message: 'Missing user info or credential' });
    }

    // Check if user already exists
    let user = await userModel.findOne({ email: userData.email });

    if (!user) {
      // Create new user
      user = await userModel.create({
        name: userData.name,
        email: userData.email,
        googleId: userData.googleId,
        profilePicture: userData.picture,
        isGoogleUser: true
      });
    } else {
      // Update existing user with Google info if not already set
      if (!user.googleId) {
        user.googleId = userData.googleId;
        user.isGoogleUser = true;
        if (!user.profilePicture) {
          user.profilePicture = userData.picture;
        }
        await user.save();
      }
    }

    // Generate JWT token
    const token = jwt.sign(
      { email: user.email, userid: user._id },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        profilePicture: user.profilePicture,
        isGoogleUser: user.isGoogleUser
      }
    });

  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({ success: false, message: 'Authentication failed' });
  }
});

// Guest login route
app.post('/api/auth/guest', async (req, res) => {
  try {
    // Create a temporary guest user
    const guestUser = {
      id: 'guest_' + Date.now(),
      name: 'Guest User',
      email: 'guest@example.com',
      phone: null,
      profilePicture: null,
      isGuest: true
    };

    // Generate a temporary token for guest
    const token = jwt.sign(
      { userid: guestUser.id, isGuest: true },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '24h' } // Guest tokens expire in 24 hours
    );

    res.status(200).json({
      success: true,
      token,
      user: guestUser
    });

  } catch (error) {
    console.error('Guest login error:', error);
    res.status(500).json({ success: false, message: 'Guest login failed' });
  }
});

// Verify JWT token
app.get('/api/auth/verify', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');

    // Check if it's a guest token
    if (decoded.isGuest) {
      return res.status(200).json({
        success: true,
        user: {
          id: decoded.userid,
          name: 'Guest User',
          email: 'guest@example.com',
          phone: null,
          profilePicture: null,
          isGuest: true
        }
      });
    }

    const user = await userModel.findById(decoded.userid);

    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        profilePicture: user.profilePicture,
        isGoogleUser: user.isGoogleUser
      }
    });

  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
});

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
      isGoogleUser: false
    });

    const token = jwt.sign({ email: user.email, userid: user._id }, process.env.JWT_SECRET || 'secret');
    res.cookie('token', token);
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isGoogleUser: false
      }
    });
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

    // Check if user is a Google user
    if (user.isGoogleUser) {
      return res.status(400).json({ message: 'This account was created with Google. Please use Google login.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ email: user.email, userid: user._id }, process.env.JWT_SECRET || 'secret');
    res.cookie('token', token);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isGoogleUser: false
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
});

// Save ride to user's history with authentication
app.post('/save-ride-history', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');

    // Check if it's a guest user
    if (decoded.isGuest) {
      // For guest users, we don't save to database but return success
      return res.status(200).json({
        message: 'Ride confirmed (Guest mode - not saved to history)',
        isGuest: true
      });
    }

    const user = await userModel.findById(decoded.userid);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { dropLocation, date, time, payment } = req.body;

    user.rideHistory.push({ dropLocation, date, time, payment });
    await user.save();

    res.status(200).json({ message: 'Ride history updated', rideHistory: user.rideHistory });
  } catch (error) {
    res.status(500).json({ message: 'Error saving ride history' });
  }
});

app.get('/ride-history', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');

    // Check if it's a guest user
    if (decoded.isGuest) {
      return res.status(200).json([]); // Return empty array for guest users
    }

    const user = await userModel.findById(decoded.userid);

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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
