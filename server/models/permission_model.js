import { Schema, model } from "mongoose";

const permissionSchema = new Schema(
  {
    url: { type: String, required: [true, "Url is required"] },
    allowed_roles: { type: Array, default: [] },
  },
  { timestamps: true }
);

const Permission = model("permissions", permissionSchema);

export default Permission;
