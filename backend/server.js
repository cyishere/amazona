/*
 * @Author: chen yang
 * @Date: 2020-09-13 14:53:09
 * @Last Modified by: Chen Yang
 * @Last Modified time: 2020-09-19 11:36:20
 */
import express from "express";
import config from "./config";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import orderRoute from "./routes/orderRoute";

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
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.get("/api/config/paypal", (req, res) => {
  res.send(config.PAYPAL_CLIENT_ID);
});

app.listen(5000, () =>
  console.log(`Server is running at http://localhost:5000`)
);
