const express = require('express');
const cors = require('cors'); // Add this if you haven't

const app = express();

// CORS setup to allow requests from http://localhost:5173 with credentials
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true, // Allow cookies and credentials
  methods: 'GET,POST', // Allow the necessary methods
  allowedHeaders: 'Content-Type,Authorization', // Ensure the required headers are allowed
}));

const userModel = require('./models/userModel.js');
// const postModel = require('./models/post');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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
    // Return the user's name along with the success message
    res.status(201).json({ message: 'User registered successfully', name: user.name });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
});


// User login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // Generate a token (JWT)
    const token = jwt.sign({ email: user.email, userid: user._id }, 'secret');
    
    // Set the token in cookies
    res.cookie('token', token);

    // Return the login success message along with the user's name
    res.status(200).json({
      message: 'Login successful',
      name: user.name,  // Include the user's name
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
});


// User logout
app.get('/logout', (req, res) => {
  res.cookie('token', '');
  res.status(200).json({ message: 'Logged out successfully' });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
