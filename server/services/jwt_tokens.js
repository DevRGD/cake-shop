import jwt from "jsonwebtoken";

export const generate_access_token = async (user) => {
  return jwt.sign(user, process.env.ACCESS_SECRET, { expiresIn: process.env.ACCESS_EXPIRE });
};

export const generate_refresh_token = async (user) => {
  return jwt.sign(user, process.env.REFRESH_SECRET, { expiresIn: process.env.REFRESH_EXPIRE });
};
