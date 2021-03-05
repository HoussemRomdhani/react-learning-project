import * as ActionTypes from '../actions/actionsTypes';

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

const reducer = (state = initialState, action) => {
  switch (action.type) {
      case ActionTypes.ADD_INGREDIENT:
         return {
             ...state,
             ingredients: {
                 ...state.ingredients,
                 [action.ingredientName] : state.ingredients[action.ingredientName] + 1
             },
             totalPrice: state.totalPrice +  INGREDIENT_PRICES[action.ingredientName]
         };
      case ActionTypes.REMOVE_INGREDIENT:
        return {
            ...state,
            ingredients: {
                ...state.ingredients,
                [action.ingredientName] : state.ingredients[action.ingredientName] - 1
            },
            totalPrice: state.totalPrice -  INGREDIENT_PRICES[action.ingredientName]
        };
      case ActionTypes.SET_INGREDIENTS:
        return {
            ...state,
              ingredients: action.ingredients,
              error: false
            };
       case ActionTypes.FETCH_INGREDIENTS_FAILED:
        return {
            ...state,
            error: true
        };          
      default:
        return state;
  }
}

export default reducer;