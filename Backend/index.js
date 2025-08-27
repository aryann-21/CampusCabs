require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { OAuth2Client } = require('google-auth-library');
const userModel = require('./models/userModel.js');

// const twilio = require('twilio');
const { sendRideConfirmationEmail } = require('./services/sendgridService');

const app = express();

// CORS setup to allow requests from frontend
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      'https://campuscabs-frontend-4lpym0wq2-aryann-21s-projects.vercel.app',
      'https://campuscabs-frontend-4lpym0wq2-aryann-21s-projects.vercel.app/',
      'https://campuscabs-frontend-aryann-21-aryann-21s-projects.vercel.app',
      'https://campuscabs-frontend-aryann-21-aryann-21s-projects.vercel.app/',
      'https://campuscabs-frontend.vercel.app',
      'https://campuscabs-frontend.vercel.app/',
      'http://localhost:3000',
      'http://localhost:5173'
    ];

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  preflightContinue: false,
  optionsSuccessStatus: 200
}));

// Handle preflight requests explicitly
app.options('*', cors());

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
    console.log('Google auth request received:', {
      body: req.body,
      headers: req.headers,
      origin: req.headers.origin,
      method: req.method
    });

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
      console.log('Missing user info or credential in request body');
      return res.status(400).json({ success: false, message: 'Missing user info or credential' });
    }

    console.log('Processed user data:', userData);

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
      console.log('New user created:', user._id);
    } else {
      // Update existing user with Google info if not already set
      if (!user.googleId) {
        user.googleId = userData.googleId;
        user.isGoogleUser = true;
        if (!user.profilePicture) {
          user.profilePicture = userData.picture;
        }
        await user.save();
        console.log('Existing user updated with Google info:', user._id);
      }
    }

    // Generate JWT token
    const token = jwt.sign(
      { email: user.email, userid: user._id },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );

    console.log('Google auth successful for user:', user.email);

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
    res.status(500).json({
      success: false,
      message: 'Authentication failed',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
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
  console.log('🚗 /save-ride-history endpoint hit!');
  console.log('Request body:', req.body);
  console.log('Authorization header:', req.headers.authorization);

  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');

    // Check if it's a guest user
    if (decoded.isGuest) {
      // For guest users, we don't save to database and can't send email
      console.log('Guest user confirmed ride - no email sent');
      return res.status(200).json({
        message: 'Ride confirmed (Guest mode - not saved to history)',
        isGuest: true
      });
    }

    const user = await userModel.findById(decoded.userid);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { dropLocation, date, time, payment, numberOfPeople, fare, driverName, driverPhone, cabNumber } = req.body;

    // Debug: Log all received data
    console.log('Received ride data:', { dropLocation, date, time, payment, numberOfPeople, fare, driverName, driverPhone, cabNumber });
    console.log('User found:', { name: user.name, email: user.email });

    user.rideHistory.push({ dropLocation, date, time, payment });
    await user.save();

    // Send confirmation email if ride details are provided
    console.log('Checking email conditions:', {
      hasDriverName: !!driverName,
      hasDriverPhone: !!driverPhone,
      hasCabNumber: !!cabNumber,
      hasNumberOfPeople: !!numberOfPeople,
      hasFare: !!fare
    });

    if (driverName && driverPhone && cabNumber && numberOfPeople && fare) {
      // Check if user has an email address
      if (!user.email) {
        console.log('User has no email address, skipping email confirmation');
        return res.status(200).json({ message: 'Ride history updated (no email sent - user has no email)', rideHistory: user.rideHistory });
      }

      try {
        const rideData = { dropLocation, date, time, numberOfPeople, fare };
        const userData = { name: user.name, email: user.email };
        const driverData = { driverName, driverPhone, cabNumber };

        console.log('Sending confirmation email to:', user.email);
        console.log('User data:', userData);

        await sendRideConfirmationEmail(rideData, userData, driverData);
        console.log('Ride confirmation email sent successfully to:', user.email);
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError);
        // Don't fail the ride confirmation if email fails
      }
    }

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

// Simple test route
app.get('/test', (req, res) => {
  res.json({ message: 'Backend is working!', timestamp: new Date().toISOString() });
});

// Health check endpoint for CORS testing
app.get('/health', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.json({
    status: 'OK',
    message: 'Backend is healthy!',
    timestamp: new Date().toISOString(),
    cors: 'enabled'
  });
});

// Test endpoint to verify user email retrieval
app.get('/test-user-email', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');

    if (decoded.isGuest) {
      return res.status(200).json({
        message: 'Guest user - no email available',
        isGuest: true
      });
    }

    const user = await userModel.findById(decoded.userid);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'User email retrieved successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isGoogleUser: user.isGoogleUser
      }
    });

  } catch (error) {
    console.error('Error testing user email:', error);
    res.status(500).json({ message: 'Error testing user email' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
