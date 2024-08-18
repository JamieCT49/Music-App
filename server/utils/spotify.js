const fetch = require('node-fetch');
const querystring = require('querystring');
const dotenv = require('dotenv');

dotenv.config();

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;

const getAccessToken = async () => {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`
        },
        body: querystring.stringify({ grant_type: 'client_credentials' })
    });

    const data = await response.json();
    return data.access_token;
};

const getFeaturedPlaylists = async () => {
    const accessToken = await getAccessToken();
    const response = await fetch('https://api.spotify.com/v1/browse/featured-playlists', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const data = await response.json();
    return data;
};

module.exports = { getFeaturedPlaylists };