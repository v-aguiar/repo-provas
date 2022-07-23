﻿import { Router } from "express";

import { create, getByDisciplines } from "../controllers/testController.js";

import { schemaValidatorMiddleware as schemaValidator } from "../middlewares/schemaValidatorMiddleware.js";
import validateApiToken from "../middlewares/validateApiToken.js";
import createTestSchema from "../schemas/createTestSchema.js";

const testRouter = Router();

testRouter.post("/tests", validateApiToken, schemaValidator(createTestSchema), create);
testRouter.get("/tests/disciplines", validateApiToken, getByDisciplines);

export default testRouter;
