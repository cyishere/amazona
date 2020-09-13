/*
 * @Author: chen yang
 * @Date: 2020-09-13 14:53:09
 * @Last Modified by: chen yang
 * @Last Modified time: 2020-09-13 18:26:33
 */
import express from "express";
import data from "./data";

const app = express();

app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.get("/api/products/:id", (req, res) => {
  const product = data.products.find(
    (product) => product._id === req.params.id
  );

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ msg: "Product Not Found." });
  }
});

app.listen(5000, () =>
  console.log(`Server is running at http://localhost:5000`)
);
