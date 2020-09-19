/*
 * @Author: Chen Yang
 * @Date: 2020-09-19 11:56:36
 * @Last Modified by: Chen Yang
 * @Last Modified time: 2020-09-19 13:17:24
 */
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const PaypalButton = (props) => {
  const [sdkReady, setSdkPeady] = useState(false);

  const addPaypalSdk = async () => {
    const result = await axios.get("/api/config/paypal");
    const clientID = result.data;
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientID}`;
    script.async = true;
    script.onload = () => {
      setSdkPeady(true);
    };
    document.body.appendChild(script);
  };

  const createOrder = (data, actions) =>
    actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: props.amount,
          },
        },
      ],
    });

  const onApprove = (data, actions) =>
    actions.order
      .capture()
      .then((details) => props.onSuccess(data, details))
      .catch((err) => console.log(err));

  useEffect(() => {
    if (!window.paypal) {
      addPaypalSdk();
    }
  }, []);

  if (!sdkReady) {
    return <div>Loading...</div>;
  }

  const Button = window.paypal.Buttons.driver("react", { React, ReactDOM });

  return (
    <Button
      {...props}
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
    />
  );
};

export default PaypalButton;
