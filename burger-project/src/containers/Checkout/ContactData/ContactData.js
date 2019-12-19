import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContackData.css';
import axios from '../../../axios-order';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderFrom: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP CODE'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'email',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Mail'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                        ]
                },
                value: ''
            }
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
      };
      axios.post('/orders.json', order)
          .then(response => {
              this.setState({ loading: false, purchasing: false });
              this.props.history.push('/');
          })
          .catch(error => this.setState({ loading: false }));
    };

    render () {
        let form = (
            <form action="">
                <Input elementType="..." elementConfig="..." value="..."/>
                <Input inputtype="input" type="email" name="email" placeholder="Your email"/>
                <Input inputtype="input" type="text" name="street" placeholder="Your street"/>
                <Input inputtype="input" type="text" name="postal" placeholder="Postal Code"/>
                <Button clicked={this.orderHandler} btnType="Success">Order</Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner/>
        }

        return (
            <div className={classes.ContacktData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;