/*
 * @Author: chen yang
 * @Date: 2020-09-14 10:45:01
 * @Last Modified by: Chen Yang
 * @Last Modified time: 2020-09-17 16:58:09
 */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";

const CartScreen = (props) => {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleCheckout = () => {
    props.history.push("/signin?redirect=shipping");
  };

  useEffect(() => {
    dispatch(addToCart(productId, qty));
  }, [dispatch, productId, qty]);

  return (
    <div className="cart">
      <div className="cart-list">
        <ul className="cart-list-container">
          <li>
            <h3>Shopping Cart</h3>
            <div>Price</div>
          </li>
          {cartItems.length === 0 ? (
            <div>Cart is empty.</div>
          ) : (
            cartItems.map((item) => (
              <li key={item.product}>
                <div className="cart-image">
                  <img src={item.image} alt={item.name} />
                </div>

                <div className="cart-content">
                  <div>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  <div>
                    Qty:{" "}
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addToCart(item.product, e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                    <button
                      className="button"
                      type="button"
                      onClick={() => handleRemoveFromCart(item.product)}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="cart-price">${item.price}</div>
              </li>
            ))
          )}
        </ul>
      </div>

      <div className="cart-action">
        <h3>
          Subtotal ({cartItems.reduce((sum, item) => sum + +item.qty, 0)} items){" "}
          : $ {cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)}
        </h3>
        <button
          onClick={handleCheckout}
          className="button primary"
          disabled={cartItems.length === 0}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartScreen;
