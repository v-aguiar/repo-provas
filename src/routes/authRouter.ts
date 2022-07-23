import { Router } from "express";

import { schemaValidatorMiddleware as schemaValidator } from "../middlewares/schemaValidatorMiddleware.js";
import createUserSchema from "../schemas/createUserSchema.js";

import { signUp } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/sign-up", schemaValidator(createUserSchema), signUp);

export default authRouter;
