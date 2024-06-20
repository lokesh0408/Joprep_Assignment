const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" })); // To handle large payload for base64 image

const profilePath = path.join(__dirname, "data", "profile.json");

// get profile data
app.get("/profile", (req, res) => {
  fs.readFile(profilePath, (err, data) => {
    if (err) {
      return res.status(500).send("Error reading profile data");
    }
    res.json(JSON.parse(data));
  });
});

// save profile data
app.post("/profile", (req, res) => {
  fs.writeFile(profilePath, JSON.stringify(req.body, null, 2), (err) => {
    if (err) {
      return res.status(500).send("Error saving profile data");
    }
    res.status(200).send("Profile saved");
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
