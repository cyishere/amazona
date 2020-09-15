/*
 * @Author: chen yang
 * @Date: 2020-09-13 14:53:09
 * @Last Modified by: Chen Yang
 * @Last Modified time: 2020-09-15 14:03:19
 */
import express from "express";
import data from "./data";
import config from "./config";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";

const mongodbUrl = config.MONGO_URI;
mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to MongoDB.");
  })
  .catch((error) =>
    console.log("Error connnecting to MongoDB:", error.message)
  );

const app = express();

app.use(express.json());

app.use("/api/users", userRoute);

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
