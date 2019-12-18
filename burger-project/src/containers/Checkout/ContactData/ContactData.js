import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContackData.css';
import axios from '../../../axios-order';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Dmytro Sheiko',
                address: {
                    street: 'Teststreet  1',
                    zipCode: '432134',
                    country: 'Ukraine'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
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
                <input className={classes.Input} type="text" name="name" placeholder="Your name"/>
                <input className={classes.Input} type="email" name="email" placeholder="Your email"/>
                <input className={classes.Input} type="text" name="street" placeholder="Your street"/>
                <input className={classes.Input} type="text" name="postal" placeholder="Postal Code"/>
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