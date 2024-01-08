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
            "id": "deal1",
            "publisher_did": "did:key:z6MkgAQUu1rtaBRjH8cGMPz5ef3LUQT3rWbyj1mbfva67f4Z",
            "title": "50% Off on All Electronics",
            "description": "Enjoy a massive 50% discount on TVs, smartphones, and more. Limited time offer!",
            "category": "Electronics",
            "validUntil": "2024-02-28",
            "discountRate": 50,
            "terms": "Discount applies to select items only. Excludes clearance items.",
            "imageURL": "https://mydealapp.com/images/deals/electronics-discount.jpg"
          },
          {
            "id": "deal2",
            "publisher_did": "did:key:z6MkgAQUu1rtaBRjH8cGMPz5ef3LUQT3rWbyj1mbfva67f4Z",
            "title": "Buy One Get One Free - Coffee Lovers",
            "description": "Purchase any large coffee and get a second one free. Perfect for coffee enthusiasts!",
            "category": "Food & Beverages",
            "validUntil": "2024-03-15",
            "discountRate": 100,
            "terms": "Offer valid for large coffee sizes only. Free coffee must be of equal or lesser value.",
            "imageURL": "https://mydealapp.com/images/deals/coffee-bogo.jpg"
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
