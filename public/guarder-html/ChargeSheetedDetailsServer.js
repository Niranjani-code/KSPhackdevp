const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ChargeSheetedDetailsSchema = require('./ChargeSheetedDetailsSchema'); // Import the ChargeSheetedDetails schema

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

// Route to handle POST requests to add new ChargeSheetedDetails
app.post('/chargesheeteddetails', async (req, res) => {
  try {
    const chargeSheetedDetails = new ChargeSheetedDetailsSchema(req.body);
    await chargeSheetedDetails.save();
    res.status(201).send(chargeSheetedDetails);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Serve HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/Charge_Sheeted_Details.html'); // Replace 'ChargeSheetedDetails.html' with the actual filename
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
