/*
 * @Author: chen yang
 * @Date: 2020-09-15 13:07:09
 * @Last Modified by: Chen Yang
 * @Last Modified time: 2020-09-15 14:11:00
 */
import jwt from "jsonwebtoken";
import config from "./config";

const getToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    config.JWT_SECRET,
    {
      expiresIn: "48h",
    }
  );
};

export { getToken };
