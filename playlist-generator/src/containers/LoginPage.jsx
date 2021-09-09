import React, { useContext, useCallback } from 'react';
import '../styles/LoginPage.scss';
import { Redirect } from 'react-router-dom';
import SpotifyLogo from '../images/Spotify_Logo.png';
import {
    CLIENT_ID, LOGIN_URL, REDIRECT_URI, SCOPES,
} from '../utils/SpotifyApi';
import { spotifyAppContext } from '../utils/Context';

export const LoginPage = () => {
    const context = useContext(spotifyAppContext);

    const onLoginClick = useCallback(() => {
        const loginUrl = `${LOGIN_URL}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`
            + `&scope=${encodeURIComponent(SCOPES.join(' '))}&response_type=token`;

        window.open(loginUrl, '_self');
    }, []);

    if (context.user && context.token) {
        // User is already logged in, take the user to the / page
        return (
            <Redirect to="/" />
        );
    }

    return (
        <div className="login-page">
            <img className="logo" src={SpotifyLogo} alt="spotify_logo" />
            <div className="title">Welcome to Playlist Generator. Click the login button to start!</div>
            <button
                className="login-button"
                type="submit"
                onClick={onLoginClick}
            >
                Login
            </button>
        </div>
    );
};
