const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Create express app
const app = express();

// Body parser middleware
app.use(bodyParser.json());

// MongoDB URI
const mongoURI = 'mongodb://localhost:27017/login';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Define schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: String,
  password: String,
  face_id: String,
  otp: String,
  user_id: String,
  token: String,
  expiry: Date
});

// Create model
const User = mongoose.model('UserSetup', UserSchema);

// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password }).exec();
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    // Here you can implement your login logic, like generating token, verifying OTP, etc.
    // For simplicity, just sending the user data back
    res.json({ user });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
