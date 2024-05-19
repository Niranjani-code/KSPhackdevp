import express from 'express';
import mongoose from 'mongoose';

const bodyParser = require('body-parser');
const ArrestPersonDetailsSchema = require('./ArrestPersonDetailsSchema'); // Import the ArrestPersonDetails schema

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

// Route to handle POST requests to add new ArrestPersonDetails
app.post('/arrestpersondetails', async (req, res) => {
  try {
    const arrestPersonDetails = new ArrestPersonDetailsSchema(req.body);
    await arrestPersonDetails.save();
    res.status(201).send(arrestPersonDetails);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Serve HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/Arrest_Person_Details.html'); // Replace 'ArrestPersonDetails.html' with the actual filename
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
