import React, {
    useContext, useCallback, useEffect, useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import { spotifyAppContext } from '../utils/Context';
import { SPOTIFY_API_BASE } from '../utils/SpotifyApi';

/**
 * This component is the Spotify Login callback handler. After the user logged in from Spotify, Spotify will redirect the
 * user back to this page and the URL will contain the auth token that we can now use to make API calls to Spotify.
 * @returns
 */
export const AuthCallback = () => {
    const context = useContext(spotifyAppContext);
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState();

    // The URL will be something like this if the user allowed the app to access the user's data
    // http://localhost:3000/callback#access_token=BQDUjg1umLzY9gDtJqZhZSH...a4b6SvH8iYcoCSPBvBX10&token_type=Bearer&expires_in=3600
    // All we need is get the token from the "#access_token=BQDUjg1umLzY9gDtJqZhZSH...a4b6SvH8iYcoCSPBvBX10"
    // Once we got the token, add this token to the global context and then make an API call to fetch User data and also add the
    // user object to the global context so that we can access this token and user data from other pages.
    // If the user declined the app from accessing the user's data, the URL will be like this
    // http://localhost:3000/callback?error=access_denied
    const checkToken = useCallback(async () => {
        // Get the queryString from the URL which can start with a hash # or search query ?
        const queryString = window.location.hash ? window.location.hash.substring(1) : window.location.search.substring(1);

        // Split the URL query and get the name/value pair object from the params
        const params = queryString.split('&').map((param) => {
            const pair = param.split('=');
            return {
                name: pair[0],
                value: pair[1],
            };
        });

        // There are more than 1 name/value pairs of params, we need to find the param that has key = "access_token"
        const tokenPair = params.find((pair) => {
            if (pair.name === 'access_token') {
                return true;
            }
            return false;
        });

        if (tokenPair) {
            // Fetch the User object. All API calls to Spotify will need to include the 'Authorization' in the header.
            // The value for this header will be the token we received from the Spotify after the user logged in.
            const response = await fetch(`${SPOTIFY_API_BASE}/me`, {
                headers: {
                    Authorization: `Bearer ${tokenPair.value}`,
                },
            });

            if (response.status < 400) {
                const responseData = await response.json();
                context.token = tokenPair.value;
                context.user = responseData;
                history.replace('/user');
            } else {
                const responseText = await response.text();
                setErrorMessage(responseText);
            }
        } else {
            // No token in the URL, the user probably denied the app. Get the error message from the URL
            const errorPair = params.find((pair) => {
                if (pair.name === 'error') {
                    return true;
                }
                return false;
            });
            if (errorPair) {
                setErrorMessage(errorPair.value);
            }
        }
    }, []);

    useEffect(() => {
        checkToken();
    }, []);

    return (
        <div>
            {errorMessage ? (
                <div className="error-message">{errorMessage}</div>
            ) : (
                <>
                    Waiting...
                </>
            )}
        </div>
    );
};
