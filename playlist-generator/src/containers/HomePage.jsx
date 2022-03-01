/* eslint-disable no-unused-vars */
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
    const [artist, setArtist] = useState('');
    const [features, setFeatures] = useState([]);
    const [playTime, setTime] = useState(0);
    // create a separate state for each component I am going to add

    if (!user || !token) {
        // User is NOT logged in, take the user to the login page
        return (
            <Redirect to="/login" />
        );
    }

    const getArtist = async (artistName) => {
        // convert the text into query string
        const splitted = artistName.split(' ');
        const name = splitted.join('%20');
        const url = `https://api.spotify.com/v1/search?q=${name}&type=artist&limit=1`;
        const response = await fetch(url, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        response.json().then((data) => {
            const personId = data.artists.items[0].id;
            // setInfo((prevState) => {
            //     return ({
            //         ...prevState,
            //         ids: items,
            //     });
            // });
            setArtist(personId);
        });
    };
    const onCreatePlaylistClick = useCallback(() => {
        // eslint-disable-next-line no-alert
        alert('Todo');
    }, []);

    return (
        <div className="home-page">
            <UserComp user={user} />
            <Artist callback={getArtist} />
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
