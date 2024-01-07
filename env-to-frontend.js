// env-to-frontend.js
require('dotenv').config();
const fs = require('fs');

const variables = {
  VUE_APP_AUTHONOMY_APP_DID: process.env.AUTHONOMY_APP_DID,
  VUE_APP_AUTHONOMY_APP_SECRET: process.env.AUTHONOMY_APP_SECRET,
  VUE_APP_AUTHONOMY_SERVICE_URL: process.env.AUTHONOMY_SERVICE_URL,
  VUE_APP_API_SERVICE: process.env.APP_PORT ? `http://localhost:${process.env.APP_PORT}` : undefined
};

const envContent = Object.keys(variables)
  .filter(key => variables[key] !== undefined)
  .map(key => `${key}=${variables[key]}`)
  .join('\n');

fs.writeFileSync('./frontend/.env', envContent);
