/*
Router för auktorisering
*/
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const port = process.env.PORT || 5500;
const mongoUrl = process.env.MONGO_URL;

// Anslut till databas
mongoose.set("strictQuery", false)
mongoose.connect(mongoUrl, {dbName: "DT207G-Labb4" }).then( () => {
    console.log("Ansluten till databas");
}).catch((error) => {
    console.log("Error, kunde inte ansluta till databasen " + error);
});

// Modell för användare
const User = require("../models/user.model");

// Registrera ny användare
router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: "Felaktiga värden, ange användarnamn och lösenord" });
        }

        const user = new User({ username, password });
        await user.save();

        res.status(201).json({ message: "Användare skapad" });

    } catch (err) {
        // Felmeddelande för uppdatet användarnamn
        if (err.code === 11000) {
            return res.status(409).json({ error: "Användarnamnet är upptaget" });
        }
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

        //Kontollera inloggningsuppgifter mot databas

        // Kontrollera användarnamn
       const user = await User.findOne( { username });
       if(!user) {
        return res.status(401).json( { error: "Felaktigit användarnamn eller lösenord"})
       }

       // Kontrollera lösenord
       const isPasswordMatch = await user.comparePassword(password);
       if(!isPasswordMatch) {
            return res.status(401).json( { error: "Felaktigit användarnamn eller lösenord"})
       } else {
            // Skapa JWT
            const payload = { username: username };
            const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "1h" });

            const response = {
                message: "Användare inloggad",
                token: token
            }

            return res.status(200).json({ response })
       }

    } catch(error) {
        res.status(500).json({ error: "Server error" })
    }
});

module.exports = router;