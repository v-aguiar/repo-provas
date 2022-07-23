import "express-async-errors";
import express, { json } from "express";
import cors from "cors";

import errorHandler from "./middlewares/errorHandlerMiddleware.js";

import router from "./routes/router.js";

const app = express();

app.use(json());
app.use(cors());

app.use(router);
app.use(errorHandler);

export default app;
