import React from 'react';

/**
 * The global context used for storing user's auth token and user profile object
 */
export const initialAppContext = {
    token: undefined,
    user: undefined,
};

export const spotifyAppContext = React.createContext(initialAppContext);
