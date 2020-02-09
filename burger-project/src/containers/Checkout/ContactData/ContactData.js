import React, { useState } from 'react';
import Button from '../../../components/UI/Button/Button';
import { connect } from 'react-redux';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContackData.css';
import axios from '../../../axios-order';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";
import { updateObject, checkValidity } from "../../../shared/utility";

const ContactData = props => {
    const [orderForm, setOrderFrom] = useState( {
        name: {
            elementType: 'input',
                elementConfig: {
                type: 'text',
                    placeholder: 'Your Name'
            },
            value: '',
                validation: {
                required: true
            },
            valid: false,
                touched: false
        },
        street: {
            elementType: 'input',
                elementConfig: {
                type: 'text',
                    placeholder: 'Street'
            },
            value: '',
                validation: {
                required: true
            },
            valid: false,
                touched: false
        },
        zipCode: {
            elementType: 'input',
                elementConfig: {
                type: 'text',
                    placeholder: 'ZIP CODE'
            },
            value: '',
                validation: {
                required: true,
                    minLength: 5,
                    maxLength: 5
            },
            valid: false,
                touched: false
        },
        country: {
            elementType: 'input',
                elementConfig: {
                type: 'text',
                    placeholder: 'Country'
            },
            value: '',
                validation: {
                required: true
            },
            valid: false,
                touched: false
        },
        email: {
            elementType: 'input',
                elementConfig: {
                type: 'text',
                    placeholder: 'Your mail'
            },
            value: '',
                validation: {
                required: true
            },
            valid: false,
                touched: false
        },
        deliveryMethod: {
            elementType: 'select',
                elementConfig: {
                options: [
                    {value: 'fastest', displayValue: 'Fastest'},
                    {value: 'cheapest', displayValue: 'Cheapest'}
                ]
            },
            value: '',
                validation: {},
            valid: true
        }
    });

    const [ formIsValid, setFormIsValid ] = useState(false);

    const orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in orderForm) {
            formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: props.ings,
            price: props.totalPrice,
            orderData: formData,
            userId: props.userId
        };

        props.onOrderBurger(order, props.token);
    };

    const inputChangedHandler = (event, inputIdentefier) => {
        const updatedFormElement = updateObject(orderForm[inputIdentefier], {
            valid: checkValidity(event.target.value, orderForm[inputIdentefier].validation),
            touched: true,
            value: event.target.value
        });

        const updatedOrderForm = updateObject(orderForm, {
            [inputIdentefier]: updatedFormElement
        })
        updatedOrderForm[inputIdentefier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        setOrderFrom(updatedOrderForm);
        setFormIsValid(formIsValid);
    };


    const formElementsArray = [];

    for (let key in orderForm) {
        formElementsArray.push({
            id: key,
            config: orderForm[key]
        });
    }

    let form = (
        <form onSubmit={orderHandler}>
            {formElementsArray.map(formElement => {
                return (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => {
                            inputChangedHandler(event, formElement.id);
                        }}/>
                );
            })}
            <Button clicked={orderHandler} disabled={!formIsValid} btnType="Success">Order</Button>
        </form>
    );

    if (props.loading) {
        form = <Spinner/>
    }

    return (
        <div className={classes.ContacktData}>
            <h4>Enter Your Contact Data</h4>
            {form}
        </div>
    );

}

const mapStateToProps = state => (
    {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
);

const mapDispatchToProps = dispatch => ({
  onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
