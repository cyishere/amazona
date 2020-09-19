/*
 * @Author: Chen Yang
 * @Date: 2020-09-19 11:09:51
 * @Last Modified by: Chen Yang
 * @Last Modified time: 2020-09-19 11:33:17
 */
import express from "express";
import Order from "../models/orderModel";
import { isAuth } from "../util";

const router = express.Router();

/**
 * GET one
 */
router.get("/:id", isAuth, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    res.send(order);
  } else {
    res.status(404).send("Order Not Found.");
  }
});

/**
 * POST one
 */
router.post("/", isAuth, async (req, res) => {
  const newOrder = new Order({
    orderItems: req.body.orderItems,
    user: req.user._id,
    shipping: req.body.shipping,
    payment: req.body.payment,
    taxPrice: req.body.taxPrice,
    shippingPrice: req.body.shippingPrice,
    totalPrice: req.body.totalPrice,
  });

  const newOrderCreated = await newOrder.save();
  res
    .status(201)
    .send({ message: "New Order Created.", data: newOrderCreated });
});

/**
 * UPDATE one order's payment
 */
router.put("/:id/pay", isAuth, async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.payment = {
      paymentMethod: "paypal",
      paymentResult: {
        payerID: req.body.payerID,
        orderID: req.body.orderID,
        paymentID: req.body.paymentID,
      },
    };

    const updateOrder = await order.save();

    res.send({ message: "Order Paid.", order: updateOrder });
  } else {
    res.status(404).send({ message: "Order Not Found." });
  }
});

export default router;
