import React, { useEffect, useRef, useContext } from 'react';
import classes from './Cockpit.css';
import authContext from '../../context/auth-context';


const cockpit = (props) => {

    const toggleBtnRef = useRef(null);
    const AuthContext = useContext(authContext)

    useEffect(() => {
        console.log('[Cockpit.js] useEffext');
        toggleBtnRef.current.click();
        return () => {
            console.log('[Cockpit.js] cleanup work in useEffect');
        };
    }, []);

    useEffect(() => {
        console.log('[Cockpit.js] 2nd useEffext');;
        return () => {
            console.log('[Cockpit.js] cleanup work in 2nd useEffect');
        }
    });

    const assignedClasses = [];

    let btnClass = '';

    if (props.showPerson) {
        btnClass = classes.Red;
    }
    
    if (props.personsLength <= 2) {
        assignedClasses.push(classes.red);
    }

    if (props.personsLength <= 1) {
      assignedClasses.push(classes.bold);
    }

    return (
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join(" ")}>This is really working!</p>
            <button
                ref={toggleBtnRef} 
                className={btnClass}
                onClick={props.clicked}>Switch Name: </button>
                <button onClick={AuthContext.login}>Log in</button>
        </div>
    )
}

export default React.memo(cockpit);