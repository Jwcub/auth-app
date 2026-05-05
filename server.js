/*
* Testapplikation för registrering och inloggning
*/
const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();
const authToken = require("./middlewares/authToken");

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = process.env.PORT || 5501;

// Routes
app.use("/api", authRoutes);

app.get("/api/admin", authToken, async (req, res) => {
    res.json({ message: "Skyddad route!" });
});

// Starta applikation
app.listen(port, () => {
    console.log(`Server running at http:localhost:${port}`)
});