import React from 'react';
import NavigationsItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationsItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationsItem link="/" exact>Burger Builder</NavigationsItem>
        <NavigationsItem link="/orders">Orders</NavigationsItem>
    </ul>
);

export default navigationsItems;