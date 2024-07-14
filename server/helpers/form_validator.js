import HttpStatus from "http-status-codes";

export default function form_validator(type, data) {
  let keys = [];
  let errors = [];

  if (type === "login") keys = ["email", "password"];
  if (type === "signup") keys = ["name", "email", "password", "gender", "dob"];

  keys.forEach((key) => {
    if (!data[key]) errors.push({ message: `${key} is required.`, status: HttpStatus.BAD_REQUEST });
  });

  if (data.email && !isValidEmail(data.email)) {
    errors.push({ message: "Invalid email format.", status: HttpStatus.BAD_REQUEST });
  }

  if (data.password && !isValidPassword(data.password)) {
    errors.push({
      message:
        "Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
      status: HttpStatus.BAD_REQUEST,
    });
  }

  if (errors.length > 0) return errors[0];

  return false;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$/.test(password);
}
