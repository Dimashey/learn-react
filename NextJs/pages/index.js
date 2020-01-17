import React, { Component } from 'react';
import Link from "next/link";
import Router from "next/router";

class IndexPage extends Component {
    static getInitialProps(context) {
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({appName: 'Super App'});
            },1000);
        });
        return promise.then();
    }

    render() {
        return (
            <div>
                <h1>The Main Page of {this.props.appName}</h1>
                <p> Go to <Link href="/auth">Auth</Link></p>
                <button onClick={() => Router.push('/auth')}>Auth</button>
            </div>
        )
    }
}

export default IndexPage;
