import React, { Component, Fragment } from 'react';
import classes from './Person.css';
import withClass from '../../../hoc/withClass';
import PropTypes from 'prop-types';
import AuthContext from '../../../context/auth-context';

class Person extends Component  {

    constructor(props) {
        super(props);
        this.inputElementRef = React.createRef();
    }

    componentDidMount() {
        console.log(this.context.authenticated);
        this.inputElementRef.current.focus();
    }

    static contextType = AuthContext;

    render() {
        return (
            <Fragment>
                    {this.context.authenticated ? 
                        <p>Authenicated!</p> : 
                        <p>Please log in</p>}
                <p key="i1" onClick={this.props.click}>
                    I'm a {this.props.name} and i am {this.props.age} years old!
                </p>
                <p key="i2">{this.props.children}</p>
                <input 
                        key="i3" 
                        ref={this.inputElementRef}
                        type="text"
                        onChange={this.props.changed} 
                        value={this.props.name}
                />
            </Fragment>
                )
        ;
    }
}

Person.PropTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func,
}

export default withClass(Person, classes.Person);