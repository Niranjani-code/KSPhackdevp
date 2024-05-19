var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var fs = require("fs");
var path = require("path");

const app = express();

app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '10mb'
}));

mongoose.connect('mongodb://localhost:27017/mydb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("Connected to Database"));

app.post("/sign_up", (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    var face_id = req.body.face_id;
    var face_images = req.body.face_images ? JSON.parse(req.body.face_images) : []; // Parse the JSON string of face images

    var data = {
        "username": username,
        "password": password,
        "face_id": face_id
    };

    if (face_images.length > 0) {
        // Save each face image to the 'trainingimage' folder
        face_images.forEach((imageData, index) => {
            var base64Data = imageData.replace(/^data:image\/png;base64,/, "");
            var imagePath = path.join(__dirname, 'trainingimage', `${face_id}_${index + 1}.png`);
            fs.writeFile(imagePath, base64Data, 'base64', (err) => {
                if (err) {
                    console.error('Error saving face image:', err);
                    return res.status(500).send("Error saving face image");
                }
            });
        });

        db.collection('UserSetup').insertOne(data, (err, collection) => {
            if (err) {
                throw err;
            }
            console.log("Record Inserted Successfully");
            return res.redirect('signup_success.html');
        });
    } else {
        res.status(400).send("No face images received");
    }
});

app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    });
    return res.redirect('signup.html');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});
