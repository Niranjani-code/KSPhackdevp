require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcryptjs');
const fs = require('fs');

const app = express();

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB URI from environment variables
const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Database connected!'))
.catch(err => console.error('Connection error', err));

// Define a simple User schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Sign up endpoint
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user to database
        const user = new User({ username, password: hashedPassword });
        await user.save();

        // Log user signup to a file
        fs.writeFile(`./users/${username}.txt`, `Username: ${username}\nPassword: ${hashedPassword}`, (err) => {
            if (err) {
                console.error('Error during sign up:', err);
                return res.status(500).send('Error during sign up');
            }
            res.status(200).send('User signed up successfully');
        });
    } catch (err) {
        console.error('Error during sign up:', err);
        res.status(500).send('Error during sign up');
    }
});

// Serve static files from the public directory
app.use(express.static('public'));

// Catch-all route to handle all other requests and serve the main page
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
