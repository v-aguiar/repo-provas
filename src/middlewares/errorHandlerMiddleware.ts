import { NextFunction, Request, Response } from "express";

export default function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
  if (error.name === "ValidationError") {
    res.status(422).send(error.message);
  }

  if (error.name === "UnprocessableEntity") {
    res.status(422).send(error.message);
  }

  if (error.name === "Conflict") {
    res.status(409).send(error.message);
  }

  next();
}
