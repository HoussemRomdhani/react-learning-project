import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliries/Auxiliary';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import * as burgerBulderActions from '../../store/actions/index';


class BurgerBuilder extends Component {

  state = {
    purchasing: false,
    loading:false,
    //error: false
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }


updatePurchasableState = (ingredients) => {
  
  const sum = Object.keys(ingredients).map((igKey) => {
    return ingredients[igKey];
  }).reduce((sum, el) => {
    return sum + el;
  }, 0);

  return  sum > 0;
}

purchaseCancelHandler = () => {
  this.setState({ purchasing : false });
}

purchaseHandler = () => {
   this.setState({ purchasing : true });
}

purchaseContinueHandler = () => {
  this.props.history.push('/checkout');
}

  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    
   for (let key in disabledInfo) {
     disabledInfo[key] = disabledInfo[key] <= 0
   }

   let orderSummary = null;
   let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
   if ( this.state.loading ) {
    orderSummary = <Spinner />
   }

if ( this.props.ings ) {
   burger = (<Auxiliary>
    <Burger ingredients={this.props.ings} />
    <BuildControls
        ingredientAdded={this.props.onIngredientAdded} 
        ingredientRemoved={this.props.onIngredientRemoved} 
         disabled={disabledInfo}
         price={this.props.price}
         purchasable={this.updatePurchasableState(this.props.ings)}
         purchase={this.purchaseHandler}/>
  </Auxiliary>);

 orderSummary = <OrderSummary  ingredients={this.props.ings} 
modalClosed={this.purchaseCancelHandler}
purchaseContinued={this.purchaseContinueHandler}
purchaseCancelled={this.purchaseCancelHandler} 
price={this.props.price}/>;
 }                

      return (
       <Auxiliary>
          <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
            {orderSummary}
            </Modal>
            {burger}
       </Auxiliary>
      );
  }

}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
    error: state.error
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(burgerBulderActions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(burgerBulderActions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(burgerBulderActions.initIngredients()) 
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));