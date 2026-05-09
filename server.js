/*
* Testapplikation för registrering och inloggning
*/
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
const authRoutes = require("./routes/authRoutes");
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", authRoutes);

// Anslut databas
const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            dbName: "DT207G-Labb4"
        });

        console.log("Ansluten till databas");

        app.listen(port, () => {
            console.log("Server running");
        });

    } catch (err) {
        console.log(err);
    }
};

startServer();