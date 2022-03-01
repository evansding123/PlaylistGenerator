import React, { useState } from 'react';

export const Artist = (props) => {
    const [input, setInput] = useState('');
    const [presented, setPresent] = useState('');
    const handleChange = (event) => {
        setInput(event.target.value);
    };
    const handleSubmit = (event) => {
        props.callback(input);
        setPresent(input);
        event.preventDefault();
    };
    const currentName = presented === '' ? '...' : presented;
    return (
        <div>
            {`Getting recommendations for ${currentName}`}
            <form onSubmit={handleSubmit}>
                <label htmlFor="artist">
                    Enter Artist Name
                    <input type="text" value={input} onChange={handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};
