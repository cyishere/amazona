/*
 * @Author: chen yang
 * @Date: 2020-09-13 16:16:26
 * @Last Modified by: Chen Yang
 * @Last Modified time: 2020-09-15 19:32:03
 */
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_SAVE_REQUEST,
  PRODUCT_SAVE_SUCCESS,
  PRODUCT_SAVE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
} from "../constants/productConstants";

const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };

    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };

    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true };

    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };

    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

const productSaveReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_SAVE_REQUEST:
      return { loading: true };

    case PRODUCT_SAVE_SUCCESS:
      return { loading: false, product: action.payload, success: true };

    case PRODUCT_SAVE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

const productDeleteReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };

    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, product: action.payload, success: true };

    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export {
  productListReducer,
  productDetailsReducer,
  productSaveReducer,
  productDeleteReducer,
};
