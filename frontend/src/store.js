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
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
} from './reducers/userReducers';

//======================================================================

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

//default values for the 'reducer' variable upon load (Just in case person reloads/refreshes page)
const initalState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

//======================================================================
const store = createStore(
  reducer,
  initalState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
