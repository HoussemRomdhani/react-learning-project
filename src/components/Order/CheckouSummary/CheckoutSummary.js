import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CkeckoutSummary.css';

const checkoutSummary = (props) => (
                             <div className={classes.CkeckoutSummary}>
                                 <h1>I hope it tastes well!</h1>
                                 <div style={{width: '100%',  margin: 'auto'}}>
                                  <Burger ingredients={props.ingredients} />
                                 </div>
                                 <Button bntType="Danger"
                                         clicked={props.checkoutCancelled}>CANCEL</Button>
                                 <Button bntType="Success"
                                         clicked={props.checkoutContinued}>CONTINUE</Button>
                             </div>
                            );

export default checkoutSummary;