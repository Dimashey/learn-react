import React from 'react';

export const UserOutpt = (props) => {
    const style = {
        color: 'blue',
    };

    return (
        <div>
            <p style={style}>{props.name}</p>
            <p>{props.name}</p>
        </div>
    );
}
