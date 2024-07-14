import express, { json } from "express";
import index_route from "./routers/index_route.js";
import mongoose from "mongoose";
import { config } from "dotenv";
import cors from "cors";
config();

const port = process.env.port || 3000;
const db_uri = process.env.DB_URI;
const app = express();

app.use(cors());
app.use(json());
app.use(index_route);

mongoose
  .connect(db_uri)
  .then(() => app.listen(port, () => console.log(`💖 http://localhost:${port}`)))
  .catch((error) => console.log(`❤️‍🩹 ${error}`));
