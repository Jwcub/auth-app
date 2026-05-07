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

const mongoose = require("mongoose");

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            dbName: "DT207G-Labb4"
        });

        console.log("Ansluten till databas");

        app.listen(PORT, () => {
            console.log("Server running");
        });

    } catch (err) {
        console.log(err);
    }
};

startServer();