import axios from 'axios';

export const getArtist = async (artistName) => {
    const splitted = artistName.split(' ');
    const name = splitted.join('+');
    const url = `https://api.spotify.com/v1/search?q=${name}=artist`;
    const response = await axios.get(url);

    return response;
};

getArtist('Taylor Swift');
