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
    let currentRec = 'Current Seed Artist: ';
    if (presented !== '' && form === 'Enter Artist Name') {
        currentRec = `Current Seed Artist: ${presented}`;
    }
    // const currentName = presented === '' ? '...' : presented;
    return (
        <div className="artist">
            <span>{currentRec}</span>
            <form onSubmit={handleSubmit}>
                <input type="text" value={input} onChange={handleChange} placeholder={form} />
                <button
                    className="smallButton"
                    type="button"
                    onClick={handleSubmit}
                >
                    Choose
                </button>
            </form>
        </div>
    );
};
