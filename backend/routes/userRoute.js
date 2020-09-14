/*
 * @Author: chen yang
 * @Date: 2020-09-14 15:16:09
 * @Last Modified by: Chen Yang
 * @Last Modified time: 2020-09-14 15:22:55
 */
import express from "express";
import User from "../models/userModel";

const router = express.Router();

router.get("/createadmin", async (req, res) => {
  try {
    const user = new User({
      name: "Irini",
      email: "cyishere@gmail.com",
      password: "1234",
      isAdmin: true,
    });

    const newUser = await user.save();

    res.send(newUser);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

export default router;
