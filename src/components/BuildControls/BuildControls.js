import React from 'react';
import BuilControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';

const controls = [
    { label: 'Salad', type:'salad'},
    { label: 'Bacon', type:'bacon'},
    { label: 'Cheese', type:'cheese'},
    { label: 'Meat', type:'meat'}
];

const buildControls = (props) =>  (
          <div className={classes.BuildControls}>
            <p>Current price :  <strong>{props.price.toFixed(2)}</strong></p>
            { controls.map(ctrl => (<BuilControl key={ctrl.label} 
                                                 label={ctrl.label} 
                                                 added={() => props.ingredientAdded(ctrl.type)} 
                                                 removed={() => props.ingredientRemoved(ctrl.type)}
                                                 disabled={props.disabled[ctrl.type]}/>)) 
            }
            <button disabled={!props.purchasable} className={classes.OrderButton} onClick={props.purchase}>ORDER NOW</button>
          </div>
      );
   
export default buildControls;