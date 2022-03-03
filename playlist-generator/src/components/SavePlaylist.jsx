/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

export const SavePlaylist = (props) => {
    const { form } = props;
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
        <div>
            <form>
                <input type="text" value={name} onChange={handleChange} placeholder="Enter Playlist Name" />
                <input type="text" value={description} onChange={handleChange} placeholder="Enter Description" />
                <button
                    className="button"
                    type="button"
                    onClick={handleSubmit}
                >
                    Save Playlist
                </button>
            </form>
        </div>
    );
};
