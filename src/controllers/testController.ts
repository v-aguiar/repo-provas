import { Request, Response } from "express";

import testService, { CreateTestData } from "../services/testService.js";

export async function create(req: Request, res: Response) {
  const CreateTestData: CreateTestData = req.body;

  await testService.create(CreateTestData);

  res.status(201).send("✔ created");
}

export async function getByDisciplines(req: Request, res: Response) {
  const tests = await testService.getByDisciplines();

  res.status(200).send(tests);
}
