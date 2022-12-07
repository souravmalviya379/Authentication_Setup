const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');


const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access_log', {
    interval: '1d', 
    path: logDirectory
});

const development = {
    name: 'development',
    db: process.env.AUTHENTICATION_DB,
    port: process.env.AUTHENTICATION_PORT,
    asset_path: '/assets',
    session_cookie_key: process.env.AUTHENTICATION_SESSION_COOKIE_KEY,
    google_client_id: process.env.AUTHENTICATION_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.AUTHENTICATION_GOOGLE_CLIENT_SECRET,
    google_callback_url: process.env.AUTHENTICATION_GOOGLE_CALLBACK_URL,
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    }
}

const production = {
    name: 'production',
    db: process.env.AUTHENTICATION_DB,
    port: process.env.AUTHENTICATION_PORT,
    asset_path: "/assets",
    session_cookie_key: process.env.AUTHENTICATION_SESSION_COOKIE_KEY,
    google_client_id: process.env.AUTHENTICATION_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.AUTHENTICATION_GOOGLE_CLIENT_SECRET,
    google_callback_url: process.env.AUTHENTICATION_GOOGLE_CALLBACK_URL,
    morgan: {
        mode: 'combined', 
        options: {stream: accessLogStream}
    }
    
}

module.exports = production;