import React from 'react';
import NavigationsItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationsItems = () => (
    <ul className={classes.NavigationsItems}>
        <NavigationsItem link="/" active>Burger Builder</NavigationsItem>
        <NavigationsItem link="/">Checkout</NavigationsItem>
    </ul>
);

export default navigationsItems;