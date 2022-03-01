import React, { useCallback, useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { spotifyAppContext } from '../utils/Context';
import '../styles/HomePage.scss';
import { UserComp, Artist } from '../components';

export const HomePage = () => {
// create a state to hold all recommendation info in object form
// need to get a list of queries: artists, genres, audio features, playing time
// each one needs to be a seperate component each with local state that passes to this parent
    // for artists, need a separate request that takes in artist name and returns ID
// when button is clicked, send a request to spotify api with state as query

    const context = useContext(spotifyAppContext);
    const { user, token } = context;
    const info = useState({});

    if (!user || !token) {
        // User is NOT logged in, take the user to the login page
        return (
            <Redirect to="/login" />
        );
    }

    const onCreatePlaylistClick = useCallback(() => {
        // eslint-disable-next-line no-console
        console.log(info);
        // eslint-disable-next-line no-alert
        alert('Todo');
    }, []);

    return (
        <div className="home-page">
            <UserComp user={user} />
            <Artist />
            <button
                className="button"
                type="button"
                onClick={onCreatePlaylistClick}
            >
                Create Playlist
            </button>
        </div>
    );
};
