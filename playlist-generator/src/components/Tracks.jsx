/* eslint-disable no-console */
import React from 'react';

export const Tracks = (props) => {
    const { description } = props;
    const { album } = description;

    const convertTime = (milliseconds) => {
        const totalSecs = Math.floor(milliseconds / 1000);
        const minutes = Math.floor((totalSecs % 3600) / 60);
        const secs = Math.floor(totalSecs % 60);
        let duration = '';
        duration += `${minutes}:${secs < 10 ? '0' : ''}`;
        duration += secs;
        return duration;
    };

    const formatTime = convertTime(description.duration_ms);

    return (
        <div className="tracks">

            <div className="trackInfo">
                <img className="thumbnail" src={album.images[0].url} alt="thumbnail" />
                <div className="bothNames">
                    <div className="Name">{description.name}</div>
                    <div>{description.artists[0].name}</div>
                </div>
                <div>{album.name}</div>
                <div>{album.release_date}</div>
                <div>{formatTime}</div>
            </div>
        </div>
    );
};
