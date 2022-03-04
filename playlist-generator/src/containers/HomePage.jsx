/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, {
    useCallback, useContext, useState, useEffect,
} from 'react';
import { Redirect } from 'react-router-dom';
import { spotifyAppContext } from '../utils/Context';
import '../styles/HomePage.scss';
import
{
    UserComp, Artist, Features, PlaylistLength, Tracks, SavePlaylist,
} from '../components';

export const HomePage = () => {
// create a state to hold all recommendation info in object form
// need to get a list of queries: artists, genres, audio features, playing time
// each one needs to be a seperate component each with local state that passes to this parent
    // for artists, need a separate request that takes in artist name and returns ID
// when button is clicked, send a request to spotify api with state as query

    const context = useContext(spotifyAppContext);
    const { user, token } = context;

    const [energy, setEnergy] = useState(0);
    const [dance, setDance] = useState(0);
    const [acoustic, setAcoustic] = useState(0);
    const [playTime, setTime] = useState('60');

    // hooks to handle async state
    const [artist, setArtist] = useState('');
    const [playlistTracks, setTracks] = useState([]);
    const [saved, setSaved] = useState(false);

    if (!user || !token) {
        // User is NOT logged in, take the user to the login page
        return (
            <Redirect to="/login" />
        );
    }

    useEffect(() => {
        // make it so button changes from save playlist to saved when we save a playlist to the account
        setTimeout(() => {
            setSaved(false);
        }, 3000);
    }, [saved]);

    const getArtist = async (artistName) => {
        // convert the text into query string to receive json object from spotify api. parse info into state
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
            const personId = data.artists !== undefined ? data.artists.items[0].id : '';
            setArtist(personId);
        }).catch((err) => {
            console.log(err);
            // eslint-disable-next-line no-alert
            alert('name not found!');
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
        const playListLimit = playTime >= 30 ? Math.ceil(Number(playTime) / 3) : 10;
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
            console.log(data.tracks);
            setTracks(data.tracks);
        });
    }, [artist, playTime, acoustic, dance, energy]);

    const savePlaylistClick = async (playlistName, playlistDescription) => {
        const url = `https://api.spotify.com/v1/users/${user.id}/playlists`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: playlistName,
                description: playlistDescription,
                public: false,
            }),
        });
        response.json().then(async (data) => {
            // use the id generated from creating playlist to add items to it
            // get list of track uris to add to playlist
            const listURIs = playlistTracks.map((item) => {
                return item.uri;
            });
            const url2 = `https://api.spotify.com/v1/playlists/${data.id}/tracks`;
            const response2 = await fetch(url2, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uris: listURIs,
                }),
            });
            response2.json().then((data2) => {
                console.log(data, data2);
                setSaved(true);
                // eslint-disable-next-line no-alert
                alert('saved!');
            });
        });
    };

    return (
        <div className="home-page">
            <div className="inputs">
                <div className="createInputs">
                    <UserComp user={user} />
                    <Artist form="Enter Artist Name" callback={getArtist} />
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
                {/* if we get recommendations in state then this become true, giving us an option to save the playlist */}
                {playlistTracks !== undefined && playlistTracks.length > 0 && <SavePlaylist saved={saved} callback={savePlaylistClick} />}
                <div>{playlistTracks === undefined && 'PLEASE CHOOSE ARTIST'}</div>
            </div>
            <div className="playlist">
                {/* if we get recommendations in state then this become true, rendering the playlist */}
                {playlistTracks !== undefined && playlistTracks.length > 0 && playlistTracks.map((item) => {
                    return <Tracks description={item} key={item.id} />;
                })}
            </div>
        </div>
    );
};
