/*
 * @Author: chen yang
 * @Date: 2020-09-14 15:04:09
 * @Last Modified by: Chen Yang
 * @Last Modified time: 2020-09-19 11:09:19
 */
import dotenv from "dotenv";

dotenv.config();

const config = {
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || sb,
};

export default config;
