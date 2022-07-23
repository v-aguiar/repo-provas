import { Router } from "express";

import { schemaValidatorMiddleware as schemaValidator } from "../middlewares/schemaValidatorMiddleware.js";
import createUserSchema from "../schemas/createUserSchema.js";

import { signUp, signIn } from "../controllers/authController.js";
import signInSchema from "../schemas/signInSchema.js";

const authRouter = Router();

authRouter.post("/sign-up", schemaValidator(createUserSchema), signUp);
authRouter.post("/sign-in", schemaValidator(signInSchema), signIn);

export default authRouter;
