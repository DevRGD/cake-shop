import jwt from "jsonwebtoken";
import HttpStatus from "http-status-codes";
import Permission from "../models/permission_model.js";

export default function permissions(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ status: HttpStatus.UNAUTHORIZED, message: "No authorization token." });
  }

  jwt.verify(token, process.env.ACCESS_SECRET, async (err, user) => {
    if (err) return res.status(HttpStatus.FORBIDDEN).json({ status: HttpStatus.FORBIDDEN, message: "Unauthorized." });
    const url = req.originalUrl.replaceAll("/", "").toLowerCase();
    const permission = await Permission.findOne({ url });
    if (!permission) {
      await Permission.create({ url });
      return res
        .status(HttpStatus.METHOD_NOT_ALLOWED)
        .json({ status: HttpStatus.METHOD_NOT_ALLOWED, message: "Please ask admin for authorization" });
    }
    if (!isRoleAllowed(user.roles, permission.allowed_roles)) {
      return res.status(HttpStatus.FORBIDDEN).json({ status: HttpStatus.FORBIDDEN, message: "Unauthorized" });
    }
    req.user = user;
    next();
  });
}

function isRoleAllowed(user_roles, allowed_roles) {
  let roles = new Set(user_roles);
  for (let i = 0; i < allowed_roles.length; i++) {
    if (roles.has(allowed_roles[i])) return true; // role is allowed
  }

  return false; // role is not allowed
}
