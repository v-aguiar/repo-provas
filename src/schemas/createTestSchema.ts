import Joi from "joi";

import { CreateTestData } from "../services/testService.js";

const createTestSchema = Joi.object<CreateTestData>({
  name: Joi.string().required().messages({
    "string.empty": "⚠ Test name can't be empty...",
    "string.required": "⚠ Test name is required...",
  }),

  pdfUrl: Joi.string().uri().required().messages({
    "string.uri": "⚠ PdfUrl is not a valid url...",
    "string.required": "⚠ PdfUrl is required...",
    "string.empty": "⚠ PdfUrl can't be empty...",
  }),

  categoryId: Joi.number().integer().required().messages({
    "number.integer": "⚠ CategoryId is not a valid number...",
    "number.required": "⚠ CategoryId is required...",
    "number.empty": "⚠ CategoryId can't be empty...",
  }),

  teacherDisciplineId: Joi.number().integer().required().messages({
    "number.integer": "⚠ TeacherDisciplineId is not a valid number...",
    "number.required": "⚠ TeacherDisciplineId is required...",
    "number.empty": "⚠ TeacherDisciplineId can't be empty...",
  }),
});

export default createTestSchema;
