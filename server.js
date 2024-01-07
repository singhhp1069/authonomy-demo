const express = require('express');
const AuthonomySDK = require('authonomysdk').AuthonomySDK;
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const port = process.env.APP_PORT;
const CONFIG = {
    appDid: process.env.AUTHONOMY_APP_DID,
    appSecret: process.env.AUTHONOMY_APP_SECRET,
    serviceUrl: process.env.AUTHONOMY_SERVICE_URL
}
const ALLOWED_ROLE = "user"
const sdk = new AuthonomySDK(CONFIG)

// Enable CORS for all routes
app.use(cors());
// Serve static files from the Vue app build
app.use(express.static(path.join(__dirname, 'frontend/dist')));

const middleWare = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    // Check if the Authorization header is present.
    if (!authHeader) {
        return res.status(401).send('Authorization header missing');
    }
    // Split the Authorization header to get the token part.
    const token = authHeader.split(' ')[1];
    // Check if the token is present after 'Bearer'
    if (!token) {
        return res.status(401).send('Bearer token missing');
    }

    sdk.verifyAccess(token, ALLOWED_ROLE, (err, data) => {
        if (err) {
            return res.status(403).send('invalid verifying token');
        }
        if (data == "true") {
            next()
        }
    })
}

app.get("/api/news", middleWare, (req, res) => {
    res.json([
        {
            "author": "Steven John",
            "title": "Apple Trade In program lets you get credit toward new devices or a gift card",
            "description": "Apple's Trade In program can help you get a new product for less. Here's how to prepare your device to get the maximum value.",
            "url": "https://www.businessinsider.com/apple-trade-in",
            "publishedAt": "2024-01-06T20:22:01Z",

        },
        {
            "author": "Deanna Ritchie",
            "title": "OpenAI seeks media licensing for language models",
            "description": "OpenAI, a prominent artificial intelligence technology firm, has allegedly proposed to license news articles from specific media companies.",
            "url": "https://readwrite.com/openai-seeks-media-licensing-for-language-models/",
            "publishedAt": "2024-01-06T14:05:20Z",
        }
    ])
})
// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/frontend/dist/index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
