import React, { useState, useEffect } from 'react';

export const Features = (props) => {
    const { type } = props;
    const [feature, setFeature] = useState(0);

    useEffect(() => {
        props.callback(feature);
    }, [feature]);

    const getFeature = (event) => {
        setFeature(event.target.value);
    };

    return (
        <div>
            <label htmlFor={type}>
                {type}
                <input type="range" id="energy" name="energy" min="0" max="1" step="0.01" value={feature} onChange={getFeature} />
            </label>
        </div>
    );
};
