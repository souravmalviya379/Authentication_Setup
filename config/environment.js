const development = {
    name: 'development',
    asset_path: '/assets',
    session_cookie_key: "mijJxAPux7XR6WdLjSCZfJNMncMAHbeX",
    google_client_id: "242513002531-rm46u114ncag3vddgf2f23p1opqjkrq8.apps.googleusercontent.com",
    google_client_secret: "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",
    google_callback_url: "http://127.0.0.1:8000/users/auth/google/callback"
}

const production = {
    name: 'production',
    asset_path: process.env.ASSET_PATH
}

module.exports = development;