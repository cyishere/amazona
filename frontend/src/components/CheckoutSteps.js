/*
 * @Author: Chen Yang
 * @Date: 2020-09-17 17:15:40
 * @Last Modified by: Chen Yang
 * @Last Modified time: 2020-09-17 17:53:51
 */
import React from "react";

const CheckoutSteps = (props) => {
  return (
    <div className="checkout-steps">
      <div className={props.step1 ? "active" : ""}>Signin</div>
      <div className={props.step2 ? "active" : ""}>Shipping</div>
      <div className={props.step3 ? "active" : ""}>Payment</div>
      <div className={props.step4 ? "active" : ""}>Place Order</div>
    </div>
  );
};

export default CheckoutSteps;
