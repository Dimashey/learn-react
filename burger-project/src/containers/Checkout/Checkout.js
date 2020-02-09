import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import ContactData from "./ContactData/ContactData";
import Aux from "../../hoc/Auxiliary/Auxilliary";

const Checkout = props => {

    const checkoutCancelledHandler = () => {
        props.history.goBack();
    };

    const checkoutContinueHandler = () => {
        props.history.replace('/checkout/contact-data');
    };

    let summary = <Redirect to="/"/>;
    if(this.props.ings) {
        const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null;
        summary = (
            <Aux>
                {purchasedRedirect}
                <CheckoutSummary
                    ingredients={props.ings}
                    checkoutCancelled={checkoutCancelledHandler}
                    checkoutContinue={checkoutContinueHandler}/>
                <Route path={props.match.path + '/contact-data'}
                       component={ContactData}/>
            </Aux>
        );
    }


    return (
        <div>
            {summary}
        </div>
    );
};

const mapStateToProps = state => ({
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
});

export default connect(mapStateToProps)(Checkout);
