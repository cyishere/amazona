/*
 * @Author: chen yang
 * @Date: 2020-09-13 14:53:09
 * @Last Modified by: chen yang
 * @Last Modified time: 2020-09-13 15:10:50
 */
import express from "express";
import data from "./data";

const app = express();

app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.listen(5000, () =>
  console.log(`Server is running at http://localhost:5000`)
);
