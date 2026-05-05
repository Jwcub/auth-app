/*
* Middlewear för auktorisering via Json Webtokens.
*/
const jwt = require("jsonwebtoken");

function authToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) {
        return res.status(401).send({ message: "Du saknar behörighet för att komma åt innehåll" });
    }

    jwt.verify(token, process.env.JWT_KEY, (err, username) => {
        if(err) return res.status(403).send({ message: "Ogiltig JWT-token" });

        req.username = username;
        next();
    })
}

module.exports = authToken;