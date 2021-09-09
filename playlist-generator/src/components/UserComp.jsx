import React from 'react';

/**
 * See https://developer.spotify.com/documentation/web-api/reference/#category-users-profile for the list of attributes
 * in User object.
*/
export const UserComp = ({ user }) => {
    return (
        <div className="user-info">
            {user.images && user.images.length > 0 && (
                <img className="user-image" src={user.images[0].url} alt={user.images[0].url} />
            )}
            <div className="user-name">{user.display_name}</div>
        </div>
    );
};
