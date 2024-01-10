import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import cors from "cors";

import { errorHandler, NotFoundError, currentUser } from "@tixfix/common";

import { createChargeRouter } from "./routes/new";

const app = express();
app.use(express.json());
app.use(cors());
app.options("*", cors());

app.set("trust proxy", true);
app.use(
  cookieSession({
    signed: false, //no encryption
    secure: process.env.NODE_ENV !== "test", //https
  })
);

app.use(currentUser);

app.use(createChargeRouter);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
