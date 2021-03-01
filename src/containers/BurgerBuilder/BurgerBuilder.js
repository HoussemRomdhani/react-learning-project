import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliries/Auxiliary';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';


const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.6,
  cheese: 0.4,
  meat: 1.3
}

class BurgerBuilder extends Component {

  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading:false,
    error: false
  };

  componentDidMount() {
     axios.get('')
          .then(response => {
               this.setState({ingredients : response.data});
          }).catch(error => {
             this.setState({error: true});
          });
  }



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
  this.setState({loading: true});
  const order = {
    ingredients: this.state.ingredients,
    price: this.state.totalPrice,
    customer : {
      name : 'Houssem Romdhani',
      email: 'test@test.com',
      address:{
        street: 'street1',
        zipCode: '5000',
        country: 'France'
      }
    },
    delivryMethod: 'fastest'
  }
  axios.post('/orders.json', order)
       .then(response => {
         this.setState({purchasing: false, loading: false});
       })
       .catch(error  => {
        this.setState({purchasing: false, loading: false});
      });
}

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    
   for (let key in disabledInfo) {
     disabledInfo[key] = disabledInfo[key] <= 0
   }

   let orderSummary = null;
   let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
   if ( this.state.loading ) {
    orderSummary = <Spinner />
   }

  
  

if ( this.state.ingredients ) {
   burger = (<Auxiliary>
    <Burger ingredients={this.state.ingredients} />
    <BuildControls
        ingredientAdded={this.addIngredientHandler} 
        ingredientRemoved={this.removeIngredientHandler} 
         disabled={disabledInfo}
         price={this.state.totalPrice}
         purchasable={this.state.purchasable}
         purchase={this.purchaseHandler}/>
  </Auxiliary>);

 orderSummary = <OrderSummary  ingredients={this.state.ingredients} 
modalClosed={this.purchaseCancelHandler}
purchaseContinued={this.purchaseContinueHandler}
purchaseCancelled={this.purchaseCancelHandler} 
price={this.state.totalPrice}/>;
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

export default withErrorHandler(BurgerBuilder, axios);