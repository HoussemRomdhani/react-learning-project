import * as actionsTypes from './actionsTypes';
import axios from '../../axios-orders'

const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionsTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
}

const purchaseBurgerFailed = (error) => {
    return {
        type: actionsTypes.PURCHASE_BURGER_SUCCESS,
        error: error
    };
}
 
const purchaseBurgerStart = () => {
    return {
        type: actionsTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurgerInit = () => {
    return {
        type: actionsTypes.PURCHASE_BURGER_INIT
    };
} 

export const purchaseBurger = (order) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post( '/orders.json', order )
            .then( response => {
                dispatch(purchaseBurgerSuccess(response.data.name, response.data));
            })
            .catch( error => {
                dispatch(purchaseBurgerFailed(error));
            });
    }
}



const fetchOrdersStart = () => {
    return {
        type: actionsTypes.FETCH_ORDERS_START
    };
}

const fetchOrdersFail = (error) => {
    return {
        type: actionsTypes.FETCH_ORDERS_FAIL,
        error: error
    };
}

const fetchOrdersSuccess = (orders) => {
    return {
        type: actionsTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
}

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get('/orders.json')
        .then(response => {
            const fetchedOrders = [];
            for (let key in response.data) {
                fetchedOrders.push({
                    ...response.data[key],
                    id: key
                });
            }
            dispatch(fetchOrdersSuccess(fetchedOrders));
        })
        .catch(error => {
           dispatch(fetchOrdersFail(error));
        });
    }
} 


