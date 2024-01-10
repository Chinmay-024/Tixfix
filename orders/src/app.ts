import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import cors from "cors";

import { errorHandler, NotFoundError, currentUser } from "@tixfix/common";

import { deleteOrderRouter } from "./routes/delete";
import { indexOrderRouter } from "./routes/index";
import { newOrderRouter } from "./routes/new";
import { showOrderRouter } from "./routes/show";

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

app.use(deleteOrderRouter);
app.use(indexOrderRouter);
app.use(newOrderRouter);
app.use(showOrderRouter);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
