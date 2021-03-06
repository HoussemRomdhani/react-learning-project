import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../utility';


const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const purchaseBurgerInit = ( state ) => {
    return updateObject(state, {
        purchased: false
    });
}

const purchaseBurgerStart = ( state ) => {
    return updateObject(state, {
        purchased: true
    });
}

const purchaseBurgerSuccess = ( state, action ) => {
    const newOrder = {
        ...action.orderData,
        id: action.orderId
      };

      return updateObject(state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
    });
}

const purchaseBurgerFailed = ( state, action ) => {
    return updateObject(state, {
        error: action.error
    });
}

const fetchOrdersStart = (state) => {
    return updateObject(state, {
        loading: true
    });
}

const fetchOrdersFail = (state) => {
    return updateObject(state, {
        loading: false
    });
}

const fetchOrdersSucces = ( state, action) => {
    return updateObject(state, {
        orders: action.orders,
        loading: false
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.PURCHASE_BURGER_INIT): return purchaseBurgerInit(state);
        case (actionTypes.PURCHASE_BURGER_START): return purchaseBurgerStart(state);
        case (actionTypes.PURCHASE_BURGER_SUCCESS): return purchaseBurgerSuccess(state, action );
        case (actionTypes.PURCHASE_BURGER_FAILED): return purchaseBurgerFailed(state, action);
        case (actionTypes.FETCH_ORDERS_SUCCESS): return fetchOrdersSucces(state, action);
        case (actionTypes.FETCH_ORDERS_START): return fetchOrdersStart(state);
        case (actionTypes.FETCH_ORDERS_FAIL): return fetchOrdersFail(state);
        default: return state;
    }
}

export default reducer;