import { Request, Response } from "express";

import userService from "../services/userService.js";

export async function signUp(req: Request, res: Response) {
  const createUserBody = req.body;

  await userService.create(createUserBody);

  res.status(201).send("✔ created");
}
