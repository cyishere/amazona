/*
 * @Author: chen yang
 * @Date: 2020-09-14 15:10:09
 * @Last Modified by: Chen Yang
 * @Last Modified time: 2020-09-14 15:24:59
 */
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
