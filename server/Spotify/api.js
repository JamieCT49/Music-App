import dotenv from 'dotenv';

dotenv.config();

const Spotify = async (callback) => {
    const data = new URLSearchParams({
        grant_type: 'client_credentials',
        client_secret: process.env.SPOTIFY_SECRET,
        client_id: process.env.SPOTIFY_ID,
    });

    let res;

    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-ww-form-urlencoded',
                'Authoriztion': `Basic ${Buffer.from(`$(process.env.SPOTIFY_ID):$process.env.SPOTIFY_SECRET`).toString('base64')}`
            },
            body: data.toString(),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        res = await response.json();
    } catch (err) {
        callback(
            {
                status: err?.response?.status || 500,
                message: err?.message || 'Something went wrong',
              },
              undefined
        );
        return;
    }

    const instance = {
        get: async (url, options = {}) => {
            const response = await fetch(`https://api.spotify.com/v1/${url}`, {
                ...options,
                headers: {
                    ...options.headers,
                    Authoriztion: `Bearer ${res.access_token}`,
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        }
    };

    callback(undefined, instance);
};

export {Spotify};