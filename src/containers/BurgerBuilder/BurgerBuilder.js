import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliries/Auxiliary';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';


const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.6,
  cheese: 0.4,
  meat: 1.3
}

class BurgerBuilder extends Component {

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  };

  addIngredientHandler = (type) => {
      const oldCount = this.state.ingredients[type];
      const updateCount = oldCount + 1;
       
      const updatedIngredients = {...this.state.ingredients};

      updatedIngredients[type] = updateCount;

      const oldPrice = this.state.totalPrice;
      const updatePrice = oldPrice + INGREDIENT_PRICES[type];

      this.setState({
        ingredients : updatedIngredients,
        totalPrice : updatePrice
      });

      this.setPurchasableState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if(oldCount <= 0)
      return;

    const updateCount = oldCount - 1;
     
      const updatedIngredients = {...this.state.ingredients};
  
      updatedIngredients[type] = updateCount;
  
      const oldPrice = this.state.totalPrice;
      const updatePrice = oldPrice - INGREDIENT_PRICES[type];
  
      this.setState({
        ingredients : updatedIngredients,
        totalPrice : updatePrice
      });

      this.setPurchasableState(updatedIngredients);
}

setPurchasableState = (ingredients) => {
  
  const sum = Object.keys(ingredients).map((igKey) => {
    return ingredients[igKey];
  }).reduce((sum, el) => {
    return sum + el;
  }, 0);

  this.setState({
    purchasable : sum > 0
  });  
}

purchaseCancelHandler = () => {
  this.setState({ purchasing : false });
}

purchaseHandler = () => {
   this.setState({ purchasing : true });
}

purchaseContinueHandler = () => {
  alert('Your are continue!');
}

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    
   for (let key in disabledInfo) {
     disabledInfo[key] = disabledInfo[key] <= 0
   }

      return (
       <Auxiliary>
          <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
            <OrderSummary  ingredients={this.state.ingredients} 
                           modalClosed={this.purchaseCancelHandler}
                           purchaseContinued={this.purchaseContinueHandler}
                           purchaseCancelled={this.purchaseCancelHandler} 
                           price={this.state.totalPrice}/>
            </Modal>
           <Burger ingredients={this.state.ingredients} />
           <BuildControls
            ingredientAdded={this.addIngredientHandler} 
            ingredientRemoved={this.removeIngredientHandler} 
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            purchase={this.purchaseHandler}
           />
       </Auxiliary>
      );
  }

}

export default BurgerBuilder;