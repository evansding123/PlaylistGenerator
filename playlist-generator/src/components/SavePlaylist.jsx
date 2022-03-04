/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

export const SavePlaylist = (props) => {
    const { form, saved } = props;
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleChange = (event) => {
        // eslint-disable-next-line no-console
        if (event.target.placeholder === 'Enter Playlist Name') {
            setName(event.target.value);
        } else {
            setDescription(event.target.value);
        }
    };

    const handleSubmit = (event) => {
        props.callback(name, description);
        event.preventDefault();
    };

    return (
        <div className="savePlaylist">
            <form className="spform">
                <input type="text" value={name} onChange={handleChange} placeholder="Enter Playlist Name" />
                <input type="text" value={description} onChange={handleChange} placeholder="Enter Description" />
                {!saved && <button className="button" type="button" onClick={handleSubmit}>Save Playlist</button>}
                {saved && <button className="button" type="button">Saved</button>}
            </form>
        </div>
    );
};
