/*
Router för auktorisering
*/
const express = require("express");
const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        console.log("Anropat api")

        // Validera input
        if(!username || !password) {
            return res.status(400).json({ error: "Felaktigt angivet användarnamn eller lösenord"})
        }

        // Accepterade input - Skapa användare
        res.status(201).json({ message: "Användare skapad" })

    } catch(error) {
        res.status(500).json({ error: "Server error" });
    }
});

router.post("/login", async(req, res) => {
    console.log("Api fungerar...")
    res.json({ message: "Login endpoint fungerar" });
});

module.exports = router;