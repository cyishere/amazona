/*
 * @Author: chen yang
 * @Date: 2020-09-13 16:13:41
 * @Last Modified by: Chen Yang
 * @Last Modified time: 2020-09-15 14:48:12
 */
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import thunk from "redux-thunk";
import Cookie from "js-cookie";
import {
  userRegisterReducer,
  userSigninReducer,
} from "./reducers/userReducers";

const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON("userInfo") || [];

const initialState = { cart: { cartItems }, userSignin: { userInfo } };
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
