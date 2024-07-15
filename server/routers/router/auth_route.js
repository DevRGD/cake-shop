import { Router } from "express";
import * as auth_controller from "../../controllers/auth_controller.js";

export default Router()
  .post("/login", auth_controller.login)
  .post("/signup", auth_controller.signup)
  .post("/logout", auth_controller.logout)
  .post("/refresh", auth_controller.refreshToken);
