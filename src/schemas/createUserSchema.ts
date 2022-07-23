import Joi from "joi";
import { User } from "@prisma/client";

export type CreateUserSchema = User & { confirmPassword: string };

const createUserSchema = Joi.object<CreateUserSchema>({
  email: Joi.string().email().required().messages({
    "string.required": "⚠ Email is required",
    "string.empty": "⚠ Email cant't be empty",
    "string.email": "⚠ Email must be a valid email",
  }),

  password: Joi.string().required().messages({
    "string.required": "⚠ Password is required",
    "string.empty": "⚠ Password cant't be empty",
    "string.base": "⚠ Password type must be a string",
  }),

  confirmPassword: Joi.any().equal(Joi.ref("password")).messages({
    "any.only": "⚠ Passwords must match",
  }),
});

export default createUserSchema;
