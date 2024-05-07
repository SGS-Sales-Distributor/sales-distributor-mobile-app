import axios from 'axios';

export function isAuthenticated() {
    const tokens = localStorage.getItem('tokens');

    return !!tokens;
}

async function refreshAccessToken(refreshToken) {
    const API_URL = `${import.meta.env.VITE_API_HOST}:${parseInt(import.meta.env.VITE_API_PORT)}`;

    try {
        const response = await axios.post(`${API_URL}/api/v2/auth/refresh`, {
            refresh_token: refreshToken
        });

        const newAccessToken = response.data.resource.access_token;

        return newAccessToken;
    } catch (error) {
        console.error(`Failed to refresh access token: ${error.message}`);
        throw new Error(`Failed to refresh access token: ${error.message}`);
    }
}

export async function refreshAccessTokenHandler() {
    const refreshToken = localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem('tokens')).refresh_token : null;

    if (!refreshToken) {
        console.error('Refresh token not found in local storage.');
        return;
    }

    const accessToken = await refreshAccessToken(refreshToken);
    
    const tokens = {
        access_token: accessToken,
        refresh_token: refreshToken,
    };

    localStorage.setItem("tokens", JSON.stringify(tokens));
}