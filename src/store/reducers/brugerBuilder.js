import * as ActionTypes from '../actions/actionsTypes';
import { updateObject } from '../utility';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.6,
    cheese: 0.4,
    meat: 1.3
  };

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};

const addIngredient = ( state,  action  ) => {
     const updatedIngredient = { [action.ingredientName] : state.ingredients[action.ingredientName] + 1};
     const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
     const updatedState = {
          ...state,
          ingredients: updatedIngredients,
         totalPrice: state.totalPrice +  INGREDIENT_PRICES[action.ingredientName]
  };

  return updateObject(state, updatedState);
}

const removeIngredient = ( state, action ) => {
     const updatedIngredient = { [action.ingredientName] : state.ingredients[action.ingredientName] - 1};
     const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
     const updatedState = {
          ...state,
          ingredients: updatedIngredients,
         totalPrice: state.totalPrice -  INGREDIENT_PRICES[action.ingredientName]
  };

  return updateObject(state, updatedState);
}

const setIngredient = ( state, action ) => {
    return updateObject(state, { ingredients: action.ingredients,
                                 totalPrice: 4,
                                 error: false});
}

const fetchFailedIngredients = ( state ) => {
  return updateObject(state, {error: true});
}
 
const reducer = (state = initialState, action) => {
  switch (action.type) {
      case ActionTypes.ADD_INGREDIENT: return addIngredient(state, action);
      case ActionTypes.REMOVE_INGREDIENT: return removeIngredient( state, action );
      case ActionTypes.SET_INGREDIENTS: return setIngredient( state, action );
      case ActionTypes.FETCH_INGREDIENTS_FAILED: return fetchFailedIngredients( state, action)
      default: return state;
  }
}

export default reducer;