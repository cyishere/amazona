/*
 * @Author: chen yang
 * @Date: 2020-09-13 16:13:41
 * @Last Modified by: Chen Yang
 * @Last Modified time: 2020-09-19 12:37:48
 */
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import {
  productListReducer,
  productDetailsReducer,
  productSaveReducer,
  productDeleteReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import thunk from "redux-thunk";
import Cookie from "js-cookie";
import {
  userLogoutReducer,
  userRegisterReducer,
  userSigninReducer,
} from "./reducers/userReducers";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
} from "./reducers/orderReducers";

const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON("userInfo") || {};

const initialState = {
  cart: { cartItems, shipping: {}, payment: {} },
  userSignin: { userInfo },
};
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productSave: productSaveReducer,
  productDelete: productDeleteReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  userLogout: userLogoutReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderCreate: orderCreateReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
