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
    const context = useContext(spotifyAppContext);
    const { user, token } = context;
    // hooks to hold state for items we need to send to spotify API
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
            // eslint-disable-next-line no-console
            console.log('error when finding artist', err);
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
        // take the artist seed id along with all the hooks for features to get recommendations
        const seed = artist;
        const playListLimit = playTime >= 30 ? Math.ceil(Number(playTime) / 3.5) : 10;
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
            console.log('data from asking api for recomendations', data.tracks);
            setTracks(data.tracks);
        });
    }, [artist, playTime, acoustic, dance, energy]);

    const savePlaylistClick = async (playlistName, playlistDescription) => {
        // use the id generated from creating playlist to add items to it
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
                // eslint-disable-next-line no-console
                console.log('data from response for creating playlist and adding songs into playlists', data, data2);
                setSaved(true);
                // eslint-disable-next-line no-alert
                alert('saved!');
            }).catch((err) => {
                // eslint-disable-next-line no-console
                console.log('error when saving playlist', err);
                // eslint-disable-next-line no-alert
                alert('playlist not saved!');
            });
        });
    };

    return (
        <div className="home-page">
            <div className="inputs">
                <UserComp user={user} />
                <div className="createInputs">
                    <Artist form="Enter Artist Name" callback={getArtist} />
                    <Features type="Energy" callback={getEnergy} />
                    <Features type="Danceability" callback={getDance} />
                    <Features type="Acousticness" callback={getAcoustic} />
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
                {playlistTracks === undefined && <div className="savePlaylist">PLEASE CHOOSE ARTIST</div>}
            </div>
            <div className="playlist">
                <div className="labels">
                    <span className="empty"> </span>
                    <div className="bothNames">
                        <div className="Name">Title</div>
                    </div>
                    <div>Album</div>
                    <div>Date</div>
                    <div>Duration</div>
                </div>
                {/* if we get recommendations in state then this become true, rendering the playlist */}
                {playlistTracks !== undefined && playlistTracks.length > 0 && playlistTracks.map((item) => {
                    return <Tracks description={item} key={item.id} />;
                })}
            </div>
        </div>
    );
};
