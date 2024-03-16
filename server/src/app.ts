import express from "express";
import cors from "cors";
import { errorConverter, errorHandler } from "./middlewares/error";

const app = express();

app.use(express.json());

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(errorConverter);

app.use(errorHandler);

export default app;
