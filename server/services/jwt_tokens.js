import jwt from "jsonwebtoken";

export const generate_access_token = (user) => {
  return jwt.sign({ _id: user._id, name: user.name, email: user.email, roles: user.roles }, process.env.ACCESS_SECRET, {
    expiresIn: process.env.ACCESS_EXPIRE,
  });
};

export const generate_refresh_token = (user) => {
  return jwt.sign(
    { _id: user._id, name: user.name, email: user.email, roles: user.roles },
    process.env.REFRESH_SECRET,
    { expiresIn: process.env.REFRESH_EXPIRE }
  );
};
