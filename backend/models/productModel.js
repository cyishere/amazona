/*
 * @Author: Chen Yang
 * @Date: 2020-09-15 17:13:23
 * @Last Modified by: Chen Yang
 * @Last Modified time: 2020-09-15 17:18:29
 */
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true, default: 0 },
  category: { type: String, required: true },
  countInStock: { type: Number, required: true, default: 0 },
  description: { type: String, required: true },
  rating: { type: Number, required: true, default: 0 },
  numReviews: { type: Number, required: true, default: 0 },
});

const productModel = mongoose.model("Product", productSchema);

export default productModel;
