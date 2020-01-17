import React from 'react';
import User from '../../components/User';

const authIndexPage = (props) => {
    return (
        <div>
            <h1>The Auth Index Page</h1>
            <User name="Dima" age={19}/>
        </div>
    )
};

authIndexPage.getInitialProp = (context) => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({appName: 'Super App (Auth)'});
        },1000);
    });
    return promise;
};

export default authIndexPage;
