/*
 * @Author: chen yang
 * @Date: 2020-09-14 15:04:09
 * @Last Modified by: Chen Yang
 * @Last Modified time: 2020-09-15 13:10:47
 */
import dotenv from "dotenv";

dotenv.config();

const config = {
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
};

export default config;
