import cookie from "cookie";
import User from "../models/user_model.js";
import { generate_access_token, generate_refresh_token } from "../services/jwt_tokens.js";
import error_handler from "../helpers/error_handler.js";
import { hashPassword } from "../helpers/common.js";
import form_validator from "../helpers/form_validator.js";
import HttpStatus from "http-status-codes";

export const signup = async (req, res) => {
  try {
    const { name, email, password, gender, dob } = req.body;
    const fromError = form_validator("signup", { name, email, password, gender, dob });

    if (fromError) return res.status(fromError.status).json({ status: fromError.status, message: fromError.message });

    const hashedPassword = await hashPassword(password);
    const user = await User.create({ name, email, password: hashedPassword, gender, dob });
    const access_token = await generate_access_token(user);
    const refresh_token = await generate_refresh_token(user);

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("refresh_token", refresh_token, { httpOnly: true, maxAge: 60 * 60 * 24 * 7 })
    );

    res.status(HttpStatus.CREATED).json({ status: HttpStatus.CREATED, message: "Success", access_token });
  } catch (error) {
    error_handler(error, req, res);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const fromError = form_validator("login", { email, password });

    if (!fromError) return fromError;

    const user = await User.create({ name, email, password });
    const access_token = await generate_access_token(user);
    const refresh_token = await generate_refresh_token(user);

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("refresh_token", refresh_token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
      })
    );
    res.status(HttpStatus.CONTINUE).json({ status: HttpStatus.CONTINUE, message: "Success", access_token });
  } catch (error) {
    error_handler(error, req, res);
  }
};

export const logout = (req, res) => {};
export const refresh_token = (req, res) => {};
