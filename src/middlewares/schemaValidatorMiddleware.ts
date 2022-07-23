import { NextFunction, Request, Response } from "express";
import { AnySchema } from "joi";

export function schemaValidatorMiddleware(schema: AnySchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error) {
      throw {
        name: "ValidationError",
        message: error.message,
      };
    }

    next();
  };
}
