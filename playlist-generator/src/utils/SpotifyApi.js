/* eslint-disable camelcase */

/**
 * You must create a Spotify App here https://developer.spotify.com/dashboard/applications and replace this CLIENT_ID with your App's CLIENT_ID.
 * Also, you must add 'http://localhost:3000/callback' as one of your app's 'Redirect URIs'
 */
export const CLIENT_ID = '58d90499a42f4cfc88c7dbd61a79b00a';
export const REDIRECT_URI = 'http://localhost:3000/callback';

export const LOGIN_URL = 'https://accounts.spotify.com/authorize';
export const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';
export const SCOPES = [
    'user-read-private',
    'playlist-read-private',
    'playlist-modify-public',
    'playlist-modify-private',
    'user-library-read',
    'user-library-modify',
    'user-follow-read',
    'user-follow-modify',
];
