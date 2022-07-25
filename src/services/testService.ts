import { Test } from "@prisma/client";
import teacherDisciplineUtils from "../utils/teacherDisciplineUtils.js";
import testRepository from "../repositories/testRepository.js";
import categoryUtils from "../utils/categoryUtils.js";

import testUtils from "../utils/testUtils.js";

export type CreateTestData = Omit<Test, "id">;

const testService = {
  create: async ({ name, pdfUrl, categoryId, teacherDisciplineId }: CreateTestData) => {
    await testUtils.checkForTestConflict(name);
    await categoryUtils.checkCategoryExistence(categoryId);
    await teacherDisciplineUtils.checkTeacherDisciplineExistence(teacherDisciplineId);

    const createTestInsertData = {
      name,
      pdfUrl,
      categoryId,
      teacherDisciplineId,
    };

    await testRepository.create(createTestInsertData);
  },

  getByDisciplines: async () => {
    const tests = await testRepository.getByDisciplines();

    return tests;
  },

  getByTeachers: async () => {
    const tests = await testRepository.getByTeachers();

    return tests;
  },
};

export default testService;
