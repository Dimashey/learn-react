import React  from 'react';
import Aux from '../../../hoc/Auxiliary/Auxilliary'
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
      const ingredientSummary = Object.keys( props.ingredients )
          .map(igKey => {
              return (
                  <li style={{textTransform: 'capitalize'}} key={igKey}>
                      <span>{igKey}</span>: {props.ingredients[igKey]}
                  </li>);
          });

      return (
          <Aux>
              <h3>Your Order</h3>
              <p>A delicious burger with the following ingredients: </p>
              <ul>
                  {ingredientSummary}
              </ul>
              <p><strong>Total Price: {props.price}</strong></p>
              <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
              <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
          </Aux>
      );
};

export default OrderSummary;
