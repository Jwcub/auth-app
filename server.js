/*
* Testapplikation för registrering och inloggning
*/

const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 5501;
console.log(port)

// Starta applikation
app.listen(port, () => {
    console.log(`Server running at http:localhost:${port}`)
});