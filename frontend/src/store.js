//'combineReducers' all the different types of reducers from all over
//applymiddleware allows middlwares like thunk to be used
import { createStore, combineReducers, applyMiddleware } from 'redux';
//allows you to make asynchronous request in Action Creators
import thunk from 'redux-thunk';
// tools necessary to use the Redux Dev Tools
import { composeWithDevTools } from 'redux-devtools-extension';
//======================================================================

const reducer = combineReducers({});

const initalState = {};

const middleware = [thunk];

//======================================================================
const store = createStore(
  reducer,
  initalState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
