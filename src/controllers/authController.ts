import { Request, Response } from "express";

import { CreateUserSchema } from "../schemas/createUserSchema.js";
import userService from "../services/userService.js";

export async function signUp(req: Request, res: Response) {
  const createUserBody: CreateUserSchema = req.body;

  await userService.signUp(createUserBody);

  res.status(201).send("✔ created");
}

export async function signIn(req: Request, res: Response) {
  const signInData: CreateUserSchema = req.body;

  const token = await userService.signIn(signInData);

  res.status(200).send({ token });
}
