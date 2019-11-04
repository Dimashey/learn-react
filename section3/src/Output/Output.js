import React, { Component } from 'react';

class Output extends Component {
    render() {
        return (
            <div>
                <p>{this.props.number}</p>
            </div>
        )
    }
}

export default Output;