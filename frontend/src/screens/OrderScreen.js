/*
 * @Author: Chen Yang
 * @Date: 2020-09-19 11:37:45
 * @Last Modified by: Chen Yang
 * @Last Modified time: 2020-09-19 13:34:11
 */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsOrder, payOrder } from "../actions/orderActions";
import PaypalButton from "../components/PaypalButton";

const OrderScreen = (props) => {
  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, order, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successPay) {
      props.history.push("/profile");
    } else {
      dispatch(detailsOrder(props.match.params.id));
      console.log("order", order);
    }
  }, [successPay, dispatch, props.history, props.match.params.id]);

  const handleSuccessPayment = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>
          <div className="placeorder">
            <div className="placeorder-info">
              <div>
                <h3>Shipping</h3>
                <div>
                  {order.shipping.address}, {order.shipping.city},{" "}
                  {order.shipping.postalCode}, {order.shipping.country}
                </div>
                <div>
                  {order.isDeliverd
                    ? `Delevered at ${order.deliveredAt}`
                    : "Not Delivered."}
                </div>
              </div>

              <div>
                <h3>Payment</h3>
                <div>Payment Method: {order.payment.paymentMethod}</div>
                <div>
                  {order.isPaid ? `Paid at ${order.paidAt}` : "Not Paid."}
                </div>
              </div>

              <div>
                <ul className="cart-list-container">
                  <li>
                    <h3>Shopping Cart</h3>
                    <div>Price</div>
                  </li>

                  {order.orderItems.length === 0 ? (
                    <div>Cart is empty.</div>
                  ) : (
                    order.orderItems.map((item) => (
                      <li key={item._id}>
                        <div className="cart-image">
                          <img src={item.image} alt={item.name} />
                        </div>

                        <div className="cart-content">
                          <div>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </div>

                          <div>Qty: {item.qty}</div>
                        </div>

                        <div className="cart-price">{item.price}</div>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>

            <div className="placeorder-action">
              <ul>
                <li className="placeorder-actions-payment">
                  {loadingPay && <div>Finishing Payment...</div>}
                  {!order.isPaid && (
                    <PaypalButton
                      amount={order.totalPrice}
                      onSuccess={handleSuccessPayment}
                    />
                  )}
                </li>

                <li>
                  <h3>Order Summary</h3>
                </li>

                <li>
                  <div>Items</div>
                  <div>${order.itemsPrice}</div>
                </li>

                <li>
                  <div>Shipping</div>
                  <div>${order.shippingPrice}</div>
                </li>

                <li>
                  <div>Tax</div>
                  <div>${order.taxPrice}</div>
                </li>

                <li>
                  <div>Order Total</div>
                  <div>${order.totalPrice}</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderScreen;
