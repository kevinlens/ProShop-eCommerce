//'combineReducers' all the different types of reducers from all over
//applymiddleware allows middlwares like thunk to be used
import { createStore, combineReducers, applyMiddleware } from 'redux';
//allows you to make asynchronous request in Action Creators
import thunk from 'redux-thunk';
// tools necessary to use the Redux Dev Tools
import { composeWithDevTools } from 'redux-devtools-extension';
//------------
import {
  productListReducer,
  productDetailsReducer,
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';

//======================================================================

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

//default values for the 'reducer' variable upon load
const initalState = {
  cart: { cartItems: cartItemsFromStorage },
};

const middleware = [thunk];

//======================================================================
const store = createStore(
  reducer,
  initalState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
