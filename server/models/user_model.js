import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      index: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
    roles: { type: Array, default: ["user"] },
    gender: { type: String, enum: ["male", "female", null], default: null },
    dob: { type: Date, default: null },
    about: { type: String, default: null },
  },
  { timestamps: true }
);

userSchema.index({ email: 1 });

const User = model("users", userSchema);

export default User;
