import React, { Component } from 'react';

class CharComponent extends Component {
    render() {
        const style = {
            display: 'inline-block',
            padding: '16px',
            textAlign: 'center',
            margin: '16px',
            border: '1px solid black'
        }

        return (
            <div onClick={this.props.click} style={style}>{this.props.letter}</div>
        );
    }
}

export default CharComponent;