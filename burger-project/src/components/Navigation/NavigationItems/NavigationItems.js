import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = ( props ) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" active>Burger Builder</NavigationItem>
            { props.isAuthenticated
                ? <NavigationItem link="/orders">Checkout</NavigationItem>
                : null }
            { !props.isAuthenticated
                ? <NavigationItem link="/auth">Authenticate</NavigationItem>
                : <NavigationItem link="/logout">Logout</NavigationItem> }
        </ul>
    );
};

export default navigationItems;
