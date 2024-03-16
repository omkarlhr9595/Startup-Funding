import express from "express";
import cors from "cors";
import { errorConverter, errorHandler } from "./middlewares/error";
import routes from "./routes/v1";
const app = express();

app.use(express.json());

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use("/v1", routes);

app.use(errorConverter);

app.use(errorHandler);

export default app;
