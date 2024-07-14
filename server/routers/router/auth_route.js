import { Router } from "express";
import * as auth_controller from "../../controllers/auth_controller.js";

const auth_route = Router();

auth_route.post("/login", auth_controller.login);
auth_route.post("/signup", auth_controller.signup);
auth_route.post("/logout", auth_controller.logout);
auth_route.post("/refresh", auth_controller.refresh_token);

export default auth_route;
