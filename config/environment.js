const development = {
    name: 'development',
    db: process.env.AUTHENTICATION_DB,
    port: process.env.AUTHENTICATION_PORT,
    asset_path: '/assets',
    session_cookie_key: process.env.AUTHENTICATION_SESSION_COOKIE_KEY,
    google_client_id: process.env.AUTHENTICATION_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.AUTHENTICATION_GOOGLE_CLIENT_SECRET,
    google_callback_url: process.env.AUTHENTICATION_GOOGLE_CALLBACK_URL
}

const production = {
    name: 'production',
    db: process.env.AUTHENTICATION_DB,
    port: process.env.AUTHENTICATION_PORT,
    asset_path: process.env.ASSET_PATH,
    session_cookie_key: process.env.AUTHENTICATION_SESSION_COOKIE_KEY,
    google_client_id: process.env.AUTHENTICATION_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.AUTHENTICATION_GOOGLE_CLIENT_SECRET,
    google_callback_url: process.env.AUTHENTICATION_GOOGLE_CALLBACK_URL
    
}

module.exports = production;