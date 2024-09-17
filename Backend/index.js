const express = require('express');
const app = express();
const mongoose = require('mongoose'); // Import Mongoose for MongoDB
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('path');
const userModel = require('./models/userModel'); // Import user model
const cookieParser = require('cookie-parser'); // To parse cookies
const cors = require('cors'); // To handle CORS
require('dotenv').config(); // Load environment variables from .env file

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Needed to handle cookies
app.use(express.static(path.join(__dirname, 'public')));

// Enable CORS
app.use(cors({
  origin: 'http://localhost:5173', // URL where your React app is running
  credentials: true, // To allow cookies
}));

// JWT secret - you should store this in an environment variable for security
const JWT_SECRET = 'your_secret_key';

// Render homepage
app.get('/', (req, res) => {
  res.send('Welcome to CampusCabs API'); // Placeholder response for testing
});

// Create new user (Signup route)
app.post('/signup', async (req, res) => {
  console.log('Signup request received:', req.body); // Debugging: log the request body
  let { name, email, password, phone } = req.body;

  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      console.error('Salt generation error:', err); // Debugging: log salt generation errors
      return res.status(500).json({ message: "Server Error" });
    }

    bcrypt.hash(password, salt, async function (err, hash) {
      if (err) {
        console.error('Hashing error:', err); // Debugging: log hashing errors
        return res.status(500).json({ message: "Hashing Failed" });
      }

      try {
        // Create user with hashed password
        let createdUser = await userModel.create({
          name,
          email,
          password: hash,
          phone
        });

        console.log('User created successfully:', createdUser); // Debugging: log created user

        // Generate a token and set a cookie
        let token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
        res.cookie("token", token, { httpOnly: true, secure: false, sameSite: 'Strict' });

        // Respond with the created user (or relevant data)
        res.status(201).json({
          message: "User created successfully",
          user: {
            name: createdUser.name,
            email: createdUser.email,
            phone: createdUser.phone
          }
        });
      } catch (error) {
        console.error('User creation error:', error); // Debugging: log user creation errors
        res.status(500).json({ message: "Failed to create user", error: error.message });
      }
    });
  });
});

// Render login page
app.get('/login', (req, res) => {
  res.send('Login page endpoint'); // Placeholder response for testing
});

// Login route
app.post('/login', async (req, res) => {
  console.log('Login request received:', req.body); // Debugging: log the request body
  try {
    let user = await userModel.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: "User does not exist!" });
    else console.log('User found:', user.name); // Debugging: log found user

    // Compare passwords
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err) {
        console.error('Password comparison error:', err); // Debugging: log comparison errors
        return res.status(500).json({ message: "Server Error" });
      }

      if (result) {
        let token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        res.cookie("token", token, { httpOnly: true, secure: false, sameSite: 'Strict' });
        res.json({ message: "Login successful" });
      } else {
        res.status(400).json({ message: "Invalid credentials" });
      }
    });
  } catch (err) {
    console.error('Login error:', err); // Debugging: log login errors
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Logout route
app.get('/logout', (req, res) => {
  console.log('Logout request received'); // Debugging: log logout requests
  res.cookie("token", "", { maxAge: 0, httpOnly: true, secure: true, path: '/' }); // Clear the cookie
  res.redirect('/'); // Redirect to homepage
});


// Protect route middleware to verify the token
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    console.log('No token found'); // Debugging: log missing token
    return res.status(401).json({ message: 'Access Denied' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('Token verification error:', err); // Debugging: log token verification errors
      return res.status(403).json({ message: 'Invalid Token' });
    }
    req.user = decoded;
    next();
  });
};

// Example protected route
app.get('/dashboard/book-ride', authenticateToken, (req, res) => {
  console.log('Protected route accessed by:', req.user.email); // Debugging: log access to protected route
  res.json({ message: `Welcome, ${req.user.email}!` });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Global error handler:', err.stack); // Debugging: log global errors
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

app.listen(3000, () => {
  console.log('CampusCabs server running on port 3000');
});
