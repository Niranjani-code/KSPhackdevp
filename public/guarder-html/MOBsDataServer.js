const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const MOBsDataSchema = require('./MOBsDataSchema'); // Import the MOBsData schema

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/KSP', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Route to handle POST requests to add new MOBsData
app.post('/mobsdata', async (req, res) => {
  try {
    const mobsData = new MOBsDataSchema(req.body);
    await mobsData.save();
    res.status(201).send(mobsData);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Serve HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/MOBs_data.html'); // Replace 'MOBsData.html' with the actual filename
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
