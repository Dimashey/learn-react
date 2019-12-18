import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxilliary'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/Buildcontrols';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from '../../axios-order';

const INGRIDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: null
    };

    purchaseHandler = () =>  {
        this.setState({ purchasing: true })
    };

    componentDidMount() {
        axios.get('https://burger-project-929c7.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
            })
            .catch(error => {
                this.setState({error: true});
            });
    };

    updatePurchaseState (ingridients) {

        const sum = Object.keys(ingridients)
            .map(igKey => {
                return ingridients[igKey]
            })
            .reduce((sum, acc) => sum + acc, 0);
        this.setState({purchasable: sum > 0})
    }

    addIngridientHandler = ( type ) => {
        const oldCount = this.state.ingredients[type];
        const updateCounted = oldCount + 1;
        const updatedIngridients = {
          ...this.state.ingredients
        };
        updatedIngridients[type] = updateCounted;
        const priceAddition = INGRIDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngridients });
        this.updatePurchaseState(updatedIngridients);
    };

    removeIngridientHandler = ( type ) => {
        const oldCount = this.state.ingredients[type];

        if(oldCount <= 0) {
            return;
        }
        const updateCounted = oldCount - 1;
        const updatedIngridients = {
            ...this.state.ingredients
        };
        updatedIngridients[type] = updateCounted;
        const priceDeduction = INGRIDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngridients });
        this.updatePurchaseState(updatedIngridients);
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    };

    purchaseContinueHandler = () => {
      // alert('You continue');
        const queryParams = [];
        for(let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>;

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                        ingridientAdded={this.addIngridientHandler}
                        ingridientRemoved={this.removeIngridientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        price={this.state.totalPrice}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            );

            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
            />;
        }

        if(this.state.loading) {
            orderSummary = <Spinner/>
        };

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);