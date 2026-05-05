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
mongoose.connect(mongoUrl).then( () => {
    console.log("Ansluten till databas");
}).catch((error) => {
    console.log("Error, kunde inte ansluta till databasen " + error);
});

router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validera input
        if(!username || !password) {
            return res.status(400).json({ error: "Felaktigt angivet användarnamn eller lösenord"})
        }

        // Kontrollera om användare redan finns


        // Accepterade input - Skapa användare
        res.status(201).json({ message: "Användare skapad" })

    } catch(error) {
        res.status(500).json({ error: "Server error" });
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