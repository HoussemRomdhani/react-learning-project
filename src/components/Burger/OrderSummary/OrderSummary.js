import React from 'react';
import Auxiliary from '../../../hoc/Auxiliries/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
   const ingredientsSummary = Object.keys(props.ingredients)
                                    .map(igKey => {
                                        return (<li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}</span> : {props.ingredients[igKey]}</li>);
                                    });
 return (
     <Auxiliary>
        <h3>Your order</h3>
        <p>A delicious burger with the following ingredients: </p>
        <ul>
         {ingredientsSummary}
        </ul>
        <p><strong>Total price : {props.price.toFixed(2)}</strong></p>
        <p>Continue to checkout?</p>
        <Button clicked={props.purchaseCancelled} bntType="Danger">CANCEL</Button>
        <Button clicked={props.purchaseContinued}  bntType="Success">CONTINUE</Button>
     </Auxiliary>
 );
};

export default orderSummary;
