/*
Router för auktorisering
*/
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("dotenv").config();

const port = process.env.PORT || 5500;
const mongoUrl = process.env.MONGO_URL;

// Anslut till databas
mongoose.set("strictQuery", false)
mongoose.connect(mongoUrl, {dbName: "Labb3-Users" }).then( () => {
    console.log("Ansluten till databas");
}).catch((error) => {
    console.log("Error, kunde inte ansluta till databasen " + error);
});

// Modell för användare
const User = require("../models/Users");

// Registrera ny användare
router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: "Invalid input, send username and password" });
        }

        const user = new User({ username, password });
        await user.save();

        res.status(201).json({ message: "User created" });

    } catch (err) {
        // Mongoose duplicate key error
        if (err.code === 11000) {
            return res.status(409).json({ error: "Username already taken" });
        }
        console.error("FULL ERROR:", err);
        console.error("MESSAGE:", err.message);
        res.status(500).json({ error: err.message });
    }
});

router.post("/login", async(req, res) => {
    try {
        const { username, password } = req.body;

        // Validera input
        if(!username || !password) {
            return res.status(400).json({ error: "Felaktigt angivet användarnamn eller lösenord"})
        }

        // Kontrollera inloggningsuppgifter
        if(username === "kevin" && password === "password123") {
            res.status(200).json({ message: "Inlogningen lyckades"})
        } else {
            res.status(200).json({ message: "Inlogningen misslyckades" });
        }

    } catch(error) {
        res.status(500).json({ error: "Server error" })
    }
});

module.exports = router;