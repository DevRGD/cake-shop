import { Router } from "express";
import auth_route from "./router/auth_route.js";

const index_route = Router();

index_route.use("/", auth_route);

export default index_route;
