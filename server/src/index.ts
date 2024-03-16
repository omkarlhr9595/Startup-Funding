import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import config from "./config/config";

let server: Server;

mongoose
  .connect(config.mongodbUrl)
  .then(() => {
    server = app.listen(config.port, () => {
      console.log(`🟢 Server is running on http://localhost:${config.port}`);
    });
  })
  .catch((err) => {
    console.log("🔴 Server failed to start");
    console.log(err);
  });

const exitHandler = () => {
  if (server) {
    console.log("🔴 Server is stopping");
    server.close();
  }
  mongoose.disconnect();
};

const unexpectedErrorHandler = (error: unknown) => {
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  console.log("SIGTERM received");
  if (server) server.close();
});
