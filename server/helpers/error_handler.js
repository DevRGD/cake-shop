import logError from "./error_logger.js";
import HttpStatus from "http-status-codes";

export default function errorHandler(error, req, res, next) {
  let message = "Internal server error";

  logError(error);

  if (error.name === "ValidationError") {
    message = "Validation error";
    const errors = {};

    Object.keys(error.errors).forEach((key) => {
      errors[key] = error.errors[key].message;
    });

    return res.status(HttpStatus.BAD_REQUEST).json({ status: HttpStatus.BAD_REQUEST, message, errors });
  }

  if (error.code === 11000 && error.keyValue.email) {
    message = `Email '${error.keyValue.email}' is already registered.`;
    return res.status(HttpStatus.BAD_REQUEST).json({ status: HttpStatus.BAD_REQUEST, message });
  }

  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ status: HttpStatus.INTERNAL_SERVER_ERROR, message });
}
