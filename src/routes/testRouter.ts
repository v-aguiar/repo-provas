import { Router } from "express";

import { create } from "../controllers/testController.js";

import { schemaValidatorMiddleware as schemaValidator } from "../middlewares/schemaValidatorMiddleware.js";
import createTestSchema from "../schemas/createTestSchema.js";

const testRouter = Router();

testRouter.post("/tests", schemaValidator(createTestSchema), create);

export default testRouter;
