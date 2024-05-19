import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser'; // Corrected package name

const accidentReportSchema = require('./AccidentReportSchema'); // Import the schema for accident reports

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

// Routes
app.post('/newdata', async (req, res) => {
  try {
    const newData = new newDataSchema(req.body);
    await newData.save();
    res.status(201).send(newData);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post('/accidentreport', async (req, res) => {
  try {
    const accidentReport = new accidentReportSchema(req.body);
    await accidentReport.save();
    res.status(201).send(accidentReport);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Serve HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/Accident_reports.html');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
