import express from "express";
import "express-async-errors";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";

import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

import cookieSession from "cookie-session";
import cors from "cors";

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

app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
