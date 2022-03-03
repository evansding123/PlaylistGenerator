import React, { useState } from 'react';

export const Artist = (props) => {
    const { form } = props;
    const [input, setInput] = useState('');
    const [presented, setPresent] = useState('');
    const handleChange = (event) => {
        setInput(event.target.value);
    };
    const handleSubmit = (event) => {
        // not using useeffect here because there would be too many requests - we would be sending a request to spotify every keystroke
        props.callback(input);
        setPresent(input);
        event.preventDefault();
    };
    // can be a resusable component if there are other single forms to fill out
    let currentRec = '';
    if (presented !== '' && form === 'Enter Artist Name') {
        currentRec = `Getting recommendations for ${presented}`;
    }
    // const currentName = presented === '' ? '...' : presented;
    return (
        <div>
            {currentRec}
            <form onSubmit={handleSubmit}>
                <input type="text" value={input} onChange={handleChange} placeholder={form} />
                <input type="submit" value="Enter" />
            </form>
        </div>
    );
};
