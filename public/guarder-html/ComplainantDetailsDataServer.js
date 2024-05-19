const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ComplainantDetailsDataSchema = require('./ComplainantDetailsDataSchema'); // Import the ComplainantDetailsData schema

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

// Route to handle POST requests to add new ComplainantDetailsData
app.post('/complainantdetails', async (req, res) => {
  try {
    const complainantDetailsData = new ComplainantDetailsDataSchema(req.body);
    await complainantDetailsData.save();
    res.status(201).send(complainantDetailsData);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Serve HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/Complainant_Details_Data.html'); // Replace 'ComplainantDetailsData.html' with the actual filename
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
