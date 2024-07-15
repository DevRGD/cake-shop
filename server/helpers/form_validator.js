import HttpStatus from "http-status-codes";

export default function formValidator(type, data) {
  let keys = [];
  let errors = [];

  if (type === "login") keys = ["email", "password"];
  if (type === "signup") keys = ["name", "email", "password", "gender", "dob"];

  keys.forEach((key) => {
    if (!data[key]) {
      errors.push({ status: HttpStatus.BAD_REQUEST, message: `${convertToReadableName(key)} is required` });
    }
  });

  if (data.email && !isValidEmail(data.email)) {
    errors.push({ status: HttpStatus.BAD_REQUEST, message: "Invalid email format" });
  }

  if (data.password && !isValidPassword(data.password)) {
    errors.push({
      status: HttpStatus.NOT_ACCEPTABLE,
      message:
        "Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
    });
  }

  if (errors.length > 0) return errors[0];

  return false;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
}

function convertToReadableName(key) {
  let words = key.split("_");
  let capitalizedString = words
    .map((word) => {
      if (word.length > 0) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      } else return "";
    })
    .join(" ");

  return capitalizedString;
}
