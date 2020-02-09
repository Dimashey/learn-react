import React from 'react';
import classes from './BurgerIngridient.css';
import PropTypes from 'prop-types';

const BurgerIngridient = (props) => {

    let ingridient = null;

    switch ( props.type ) {
        case('bread-bottom'):
            ingridient = <div className={classes.BreadBottom}></div>;
            break;
        case('bread-top'):
            ingridient = (
                <div className={classes.BreadTop}>
                    <div className={classes.Seeds1}/>
                    <div className={classes.Seeds2}/>
                </div>
            );
            break;
        case('meat'):
            ingridient = <div className={classes.Meat}></div>;
            break;
        case('cheese'):
            ingridient = <div className={classes.Cheese}></div>;
            break;
        case('bacon'):
            ingridient = <div className={classes.Bacon}></div>;
            break;
        case('salad'):
            ingridient = <div className={classes.Salad}></div>;
            break;
        default:
            ingridient = null;
    }

    return ingridient;

};

BurgerIngridient.propTypes = {
    type: PropTypes.string.isRequired
};

export default BurgerIngridient;