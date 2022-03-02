/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useCallback, useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { spotifyAppContext } from '../utils/Context';
import '../styles/HomePage.scss';
import
{
    UserComp, Artist, Features, PlaylistLength,
} from '../components';

export const HomePage = () => {
// create a state to hold all recommendation info in object form
// need to get a list of queries: artists, genres, audio features, playing time
// each one needs to be a seperate component each with local state that passes to this parent
    // for artists, need a separate request that takes in artist name and returns ID
// when button is clicked, send a request to spotify api with state as query

    const context = useContext(spotifyAppContext);
    const { user, token } = context;
    const [artist, setArtist] = useState('');
    const [energy, setEnergy] = useState(0);
    const [dance, setDance] = useState(0);
    const [acoustic, setAcoustic] = useState(0);
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
            setArtist(personId);
        });

        return response;
    };

    const getEnergy = (value) => {
        setEnergy(value);
    };

    const getDance = (value) => {
        setDance(value);
    };

    const getAcoustic = (value) => {
        setAcoustic(value);
    };

    const getTime = (value) => {
        setTime(value);
    };

    const onCreatePlaylistClick = useCallback(async () => {
        const seed = artist;
        const playListLimit = Math.ceil(Number(playTime) / 3);
        console.log(playListLimit, playTime);
        const url = `https://api.spotify.com/v1/recommendations?limit=${playListLimit}&seed_artists=${seed}&target_acousticness=${acoustic}&target_danceability=${dance}&target_energy=${energy}`;

        const response = await fetch(url, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        response.json().then((data) => {
            // eslint-disable-next-line no-console
            console.log(data);
        });
    }, [artist, playTime, acoustic, dance, energy]);

    return (
        <div className="home-page">
            <UserComp user={user} />
            <Artist callback={getArtist} />
            <Features type="Energy" callback={getEnergy} />
            <Features type="Dance" callback={getDance} />
            <Features type="Acoustic" callback={getAcoustic} />
            <PlaylistLength callback={getTime} />
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
