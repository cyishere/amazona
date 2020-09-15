/*
 * @Author: Chen Yang
 * @Date: 2020-09-15 17:19:13
 * @Last Modified by: Chen Yang
 * @Last Modified time: 2020-09-15 22:26:10
 */
import express from "express";
import Product from "../models/productModel";
import data from "../data";

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ msg: "Product Not Found." });
  }
});

router.post("/", async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    brand: req.body.brand,
    category: req.body.category,
    countInStock: req.body.countInStock,
    description: req.body.description,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
  });

  const newProduct = await product.save();

  if (newProduct) {
    return res
      .status(201)
      .send({ msg: "New Product Created.", data: newProduct });
  } else {
    return res.status(500).send({ msg: "Error in creating product." });
  }
});

router.put("/:id", async (req, res) => {
  const body = req.body;
  const id = req.params.id;

  const updatedProduct = await Product.findByIdAndUpdate(id, body, {
    new: true,
  });

  if (updatedProduct) {
    return res
      .status(200)
      .send({ msg: "Product Updated.", data: updatedProduct });
  } else {
    return res.status(500).send({ msg: "Error in Updating product." });
  }
});

router.delete("/:id", async (req, res) => {
  const productToRemove = await Product.findById(req.params.id);

  if (productToRemove) {
    await productToRemove.remove();
    res.status(204).send({ msg: "Product Deleted." });
  } else {
    res.send("Error in deleting.");
  }
});

export default router;
