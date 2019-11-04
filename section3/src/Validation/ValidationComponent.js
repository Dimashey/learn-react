import React, { Component } from 'react';


class ValidationComponent extends Component {
    
    render() {

        return (
            <p>{this.props.status}</p>
        );
    }
}

export default ValidationComponent;