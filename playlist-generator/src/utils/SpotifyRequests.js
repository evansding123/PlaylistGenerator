import axios from 'axios';
import { CLIENT_ID } from './SpotifyApi.js';

export const getArtist = async (artistName) => {
    const splitted = artistName.split(' ');
    const name = splitted.join('+');
    const url = `https://api.spotify.com/v1/search?q=${name}=artist`;
    console.log(url, CLIENT_ID);
    const response = await axios.get(url, {
        Authorization: CLIENT_ID,
    });

    return response;
};

getArtist('Taylor Swift');
