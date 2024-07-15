import cookie from "cookie";
import User from "../models/user_model.js";
import { generate_access_token, generate_refresh_token } from "../services/jwt_tokens.js";
import errorHandler from "../helpers/error_handler.js";
import { comparePassword, hashPassword } from "../helpers/common.js";
import formValidator from "../helpers/form_validator.js";
import HttpStatus from "http-status-codes";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { name, email, password, gender, dob } = req.body;
    const fromError = formValidator("signup", { name, email, password, gender, dob });

    if (fromError) return res.status(fromError.status).json({ status: fromError.status, message: fromError.message });

    const hashedPassword = hashPassword(password);
    const user = await User.create({ name, email, password: hashedPassword, gender, dob });
    if (!user) {
      return res
        .status(HttpStatus.EXPECTATION_FAILED)
        .json({ status: HttpStatus.EXPECTATION_FAILED, message: "Signup failed" });
    }
    const access_token = generate_access_token(user);
    const refresh_token = generate_refresh_token(user);

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("refresh_token", refresh_token, { httpOnly: true, maxAge: 60 * 60 * 24 * 7 })
    );

    res.status(HttpStatus.CREATED).json({ status: HttpStatus.CREATED, message: "Created", access_token });
  } catch (error) {
    errorHandler(error, req, res);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const fromError = formValidator("login", { email, password });

    if (fromError) return res.status(fromError.status).json({ status: fromError.status, message: fromError.message });

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ status: HttpStatus.NOT_FOUND, message: "Invalid email or password" });
    }

    if (!comparePassword(password, user.password)) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ status: HttpStatus.NOT_FOUND, message: "Invalid email or password" });
    }

    const access_token = generate_access_token(user);
    const refresh_token = generate_refresh_token(user);

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("refresh_token", refresh_token, { httpOnly: true, maxAge: 60 * 60 * 24 * 7 })
    );

    return res.status(HttpStatus.ACCEPTED).json({ status: HttpStatus.ACCEPTED, message: "Accepted", access_token });
  } catch (error) {
    errorHandler(error, req, res);
  }
};

export const refreshToken = (req, res) => {
  try {
    const token = req.headers?.cookie?.split("=")[1];
    if (!token) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ status: HttpStatus.FORBIDDEN, message: "No authorization token." });
    }
    jwt.verify(token, process.env.REFRESH_SECRET, async (err, user) => {
      if (err)
        return res.status(HttpStatus.UNAUTHORIZED).json({ status: HttpStatus.UNAUTHORIZED, message: "Invalid token." });
      const access_token = generate_access_token(user);
      const refresh_token = generate_refresh_token(user);

      res.setHeader(
        "Set-Cookie",
        cookie.serialize("refresh_token", refresh_token, { httpOnly: true, maxAge: 60 * 60 * 24 * 7 })
      );

      return res.status(HttpStatus.ACCEPTED).json({ status: HttpStatus.ACCEPTED, message: "Accepted", access_token });
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
};

export const logout = (req, res) => {
  try {
    res.setHeader("Set-Cookie", cookie.serialize("refresh_token", "", { httpOnly: true, maxAge: -1 }));
    return res.status(HttpStatus.OK).json({ status: HttpStatus.OK, message: "Logout" });
  } catch (error) {
    errorHandler(error, req, res);
  }
};
