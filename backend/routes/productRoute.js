/*
 * @Author: Chen Yang
 * @Date: 2020-09-15 17:19:13
 * @Last Modified by: Chen Yang
 * @Last Modified time: 2020-09-16 18:24:08
 */
import express from "express";
import Product from "../models/productModel";
import { isAdmin, isAuth } from "../util";

const router = express.Router();

/**
 * GET all
 */
router.get("/", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

/**
 * GET one
 */
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      return res.json(product);
    } else {
      return res.status(404).json({ msg: "Product Not Found." });
    }
  } catch (error) {
    // console.log("error.name:", error.name); // CastError
    // const msg = error.name;
    console.log("error.message:", error.message);
    return res.status(400).json({ msg: error.message });
  }
});

/**
 * POST one
 */
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

/**
 * PUT one
 */
router.put("/:id", isAuth, isAdmin, async (req, res) => {
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

/**
 * DELETE one
 */
router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  const productToRemove = await Product.findById(req.params.id);

  if (productToRemove) {
    await productToRemove.remove();
    res.status(204).send({ msg: "Product Deleted." });
  } else {
    res.status(404).send("No product to delete.");
  }
});

export default router;
