const express = require('express');
const https = require('https');
//const http= require('http');
const fs = require('fs');
const path = require('path');

const app = express();

//Paths to your SSL certificate and key
const privateKey = fs.readFileSync('/etc/letsencrypt/live/purpurita.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/purpurita.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/purpurita.com/chain.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate, ca:ca };

app.use(express.static(path.join(__dirname, 'public')));

// Create HTTPS server
const httpsServer = https.createServer(credentials, app);
//const httpServer= http.createServer(app);

// Start the HTTPS server
const PORT = 443;
//const PORT = 80;

httpsServer.listen(PORT, () => {
    console.log(`HTTPS server is running on https://purpurita.com:${PORT}`);
});

