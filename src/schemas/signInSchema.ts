import Joi from "joi";

import { CreateUserData } from "../repositories/userRepository";

const signInSchema = Joi.object<CreateUserData>({
  email: Joi.string().email().required().messages({
    "string.email": "⚠ Email must be a valid one...",
    "string.empty": "⚠ Email cant't be empty!",
    "string.required": "⚠ Email is required",
  }),
  password: Joi.string().required().messages({
    "string.empty": "⚠ Password cant't be empty!",
    "string.required": "⚠ Password is required",
    "string.base": "⚠ Password must be a string!",
  }),
});

export default signInSchema;
