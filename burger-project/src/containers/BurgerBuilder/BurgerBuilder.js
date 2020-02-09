import React, {useState, useEffect, useCallback} from 'react';
import Aux from '../../hoc/Auxiliary/Auxilliary';
import { useDispatch, useSelector } from 'react-redux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/Buildcontrols';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from '../../axios-order';
import * as actions from '../../store/actions/index';

export const BurgerBuilder = props => {

    const [ purchasing, setPurchasing ] = useState(false);

    const dispatch = useDispatch();

    const ings = useSelector(state => {
        return state.burgerBuilder.ingredients;
    });

    const price = useSelector(state => {
        return state.burgerBuilder.totalPrice;
    });

    const error = useSelector(state => {
        return state.burgerBuilder.error;
    });

    const isAuthenticated = useSelector(state => {
        return state.auth.token !== null;
    });


    const onIngredientAdded = (ingName) => dispatch(actions.addIngredient(ingName));
    const onIngredientRemoved = (ingName) => dispatch(actions.removeIngredient(ingName));
    const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), []);
    const onInitPurchase = () => dispatch(actions.purchaseInit());
    const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients]);

    const purchaseHandler = () =>  {
        if (isAuthenticated) {
            setPurchasing(true )
        } else {
            onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }

    };

    const updatePurchaseState = (ingridients) => {

        const sum = Object.keys(ingridients)
            .map(igKey => {
                return ingridients[igKey]
            })
            .reduce((sum, acc) => sum + acc, 0);
        return sum > 0;
    }

    const purchaseCancelHandler = () => {
        setPurchasing( false )
    };

    const purchaseContinueHandler = () => {
        onInitPurchase();
        props.history.push('/checkout');
    };

    const disabledInfo = {
        ...ings
    };

    for(let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null;
    let burger = error ? <p>Ingredients can't be loaded!</p> : <Spinner/>;

    if (ings) {
        burger = (
            <Aux>
                <Burger ingredients={ings}/>
                <BuildControls
                    ingridientAdded={onIngredientAdded}
                    ingridientRemoved={onIngredientRemoved}
                    disabled={disabledInfo}
                    purchasable={updatePurchaseState(ings)}
                    price={price}
                    isAuth={isAuthenticated}
                    ordered={purchaseHandler}
                />
            </Aux>
        );

        orderSummary = <OrderSummary
            ingredients={ings}
            price={price}
            purchaseCancelled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler}
        />;
    }

    return (
        <Aux>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    );
};

export default withErrorHandler(BurgerBuilder, axios);
