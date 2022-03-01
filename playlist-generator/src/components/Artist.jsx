import React, { useState } from 'react';

export const Artist = () => {
    const [input, setInput] = useState('');
    const handleChange = (event) => {
        setInput(event.target.value);
    };
    return (
        <form>
            <label htmlFor="artist">
                Enter Artist Name
                <input type="text" value={input} onChange={handleChange} />
            </label>
        </form>
    );
};
