/*
 * @Author: Chen Yang
 * @Date: 2020-09-17 17:37:11
 * @Last Modified by: Chen Yang
 * @Last Modified time: 2020-09-19 13:32:27
 */

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../actions/orderActions";

const PlaceOrderScreen = (props) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems, shipping, payment } = cart;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { success, order } = orderCreate;

  const dispatch = useDispatch();

  if (!shipping.address) {
    props.history.push("/shipping");
  } else if (!payment.paymentMethod) {
    props.history.push("/payment");
  }

  const itemsPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = 0.15 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const handlePlaceOrder = () => {
    // create an order
    dispatch(
      createOrder({
        orderItems: cartItems,
        shipping,
        payment,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      })
    );
  };

  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      // console.log("order", order);
    }
  }, [success, props.history]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3>Shipping</h3>

            <div>
              {cart.shipping.address}, {cart.shipping.city},{" "}
              {cart.shipping.postalCode}, {cart.shipping.country}
            </div>
          </div>

          <div>
            <h3>Payment</h3>
            <div>Payment Method: {cart.payment.paymentMethod}</div>
          </div>

          <div>
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
                      <div>Qty: {item.qty}</div>
                    </div>

                    <div className="cart-price">${item.price}</div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>

        <div className="placeorder-action">
          <ul>
            <li>
              <button
                className="button primary full-width"
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>
            </li>

            <li>
              <h3>Order Summary</h3>
            </li>

            <li>
              <div>Items</div>
              <div>${itemsPrice}</div>
            </li>

            <li>
              <div>Shipping</div>
              <div>${shippingPrice}</div>
            </li>

            <li>
              <div>Tax</div>
              <div>${taxPrice}</div>
            </li>

            <li>
              <div>Order Total</div>
              <div>${totalPrice}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
