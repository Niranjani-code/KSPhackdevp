// Import necessary modules
import express from 'express';
import mongoose from 'mongoose';
const PORT = 8082;
// Create Express app
const app = express();
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/KSP', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected successfully');
    // Start the server
    app.listen(8082, () => {
      console.log('Server is running on port 8082');
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
// Define the event schema
const eventSchema = new mongoose.Schema({
  title: String,
  date: String,
  time: String,
  location: String,
  category: String
});
// Define the Event model
const Event = mongoose.model('Accidentreports', eventSchema);
// Set up routes
// Retrieve all events in JSON format
app.get('/events', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Add an event
app.post('/events', async (req, res) => {
  const { title, date, time, location, category } = req.body;
  try {
    const event = new Event({ title, date, time, location, category });
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// Delete all events
app.delete('/events', async (req, res) => {
  try {
    await Event.deleteMany();
    res.json({ message: 'All events deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
