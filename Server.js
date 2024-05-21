const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const bcrypt = require('bcryptjs');

const app = express();

app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '10mb'
}));


const uri = 'mongodb+srv://Niranjani:XQcaKaMA7qmmyvoZ@ac-70c4zbm.xqjmlkh.mongodb.net/mydb?retryWrites=true&w=majority';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Database connected!'))
.catch(err => console.error('Connection error', err));

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    face_id: String
});

const UserSetup = mongoose.model('UserSetup', userSchema);

// Route to serve the dashboard page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to serve the QR code page
app.get('/qrcode', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'qrcode.html'));
});

// Routes for login and signup pages
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// Signup endpoint
app.post("/sign_up", async (req, res) => {
    const { username, password, face_images } = req.body;
    const parsedFaceImages = face_images ? JSON.parse(face_images) : [];

    if (!username || !password || parsedFaceImages.length === 0) {
        return res.status(400).send("All fields are required and at least one face image should be uploaded");
    }

    const face_id = 'face_' + Date.now();
    const data = {
        username,
        password: bcrypt.hashSync(password, 10),
        face_id
    };

    try {
        for (let index = 0; index < parsedFaceImages.length; index++) {
            const imageData = parsedFaceImages[index];
            const base64Data = imageData.replace(/^data:image\/png;base64,/, "");
            const imagePath = path.join(__dirname, 'trainingimage', `${face_id}_${index + 1}.png`);
            await fs.promises.writeFile(imagePath, base64Data, 'base64');
        }

        await UserSetup.create(data);
        console.log("Record Inserted Successfully");
        res.status(200).send("Signup successful");
    } catch (err) {
        console.error('Error during sign up:', err);
        res.status(500).send("Error during sign up");
    }
});

// Login endpoint
app.post("/login", async (req, res) => {
    const { username, password, face_image } = req.body;

    if (!username || !password || !face_image) {
        return res.status(400).send("All fields are required");
    }

    try {
        const user = await UserSetup.findOne({ username });
        if (!user) {
            console.log("User not found");
            return res.status(400).send("Incorrect username or password");
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            console.log("Invalid password");
            return res.status(400).send("Incorrect username or password");
        }

        // Placeholder for face recognition
        console.log("Face recognized successfully (placeholder)");

        res.status(200).send("Login successful");
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).send("Server error");
    }
});

app.listen(7000, () => {
    console.log('Server is running on http://localhost:7000');
});
