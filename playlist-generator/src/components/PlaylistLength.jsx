/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';

export const PlaylistLength = (props) => {
    const [length, setLength] = useState(0);

    useEffect(() => {
        props.callback(length);
    }, [length]);

    const getLength = (event) => {
        setLength(event.target.value);
    };

    return (
        <div onChange={getLength}>
            <input type="radio" id="length" name="length" value={30} />
            <label htmlFor="30">30</label>

            <input type="radio" id="length" name="length" value={45} />
            <label htmlFor="45">45</label>

            <input type="radio" id="length" name="length" value={60} />
            <label htmlFor="60">60</label>

            <input type="radio" id="length" name="length" value={90} />
            <label htmlFor="90">90</label>
        </div>
    );
};
