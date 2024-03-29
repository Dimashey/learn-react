import React, { useState } from 'react';
import Aux from '../Auxiliary/Auxilliary'
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

const  Layout = props =>  {
    const [ sideDrawerIsVisible, setSideDrawerIsVisible ] = useState(false);

    const sideDrawerToggleHandler = () => {
      setSideDrawerIsVisible(!sideDrawerIsVisible);
    };

    return (
        <Aux>
            <Toolbar
                isAuth={props.isAuthenticated}
                drawerToggleClicked={sideDrawerToggleHandler}/>
            <SideDrawer
                isAuth={props.isAuthenticated}
                open={sideDrawerIsVisible}
                closed={sideDrawerToggleHandler}/>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    );
}


const mapStateToProps = state => {
  return {
      isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layout);