import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import cors from "cors";

import { errorHandler, NotFoundError, currentUser } from "@tixfix/common";

import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";
import { indexTicketRouter } from "./routes";
import { updateTicketRouter } from "./routes/update";

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
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
