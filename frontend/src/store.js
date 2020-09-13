/*
 * @Author: chen yang
 * @Date: 2020-09-13 16:13:41
 * @Last Modified by: chen yang
 * @Last Modified time: 2020-09-13 16:27:51
 */
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { productListReducer } from "./reducers/productReducers";
import thunk from "redux-thunk";

const initialState = {};
const reducer = combineReducers({
  productList: productListReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
