/*
* Testapplikation för registrering och inloggning
*/
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");

// Middlewares
const app = express();
const port = process.env.PORT || 5501;

app.use(cors());
app.use(express.json());


// Routes
app.use("/api", authRoutes);

// Starta applikation
app.listen(port, () => {
    console.log(`Server running at http:localhost:${port}`)
});