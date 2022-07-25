import { faker } from "@faker-js/faker";
import { prisma } from "../../src/config/db.js";

import { CreateTestData } from "../../src/services/testService.js";

const testFactory = {
  generateTestData: (): CreateTestData => {
    return {
      name: faker.random.word(),
      pdfUrl: faker.internet.url(),
      categoryId: faker.datatype.number({
        min: 1,
        max: 3,
        precision: 1,
      }),
      teacherDisciplineId: faker.datatype.number({
        min: 1,
        max: 6,
        precision: 1,
      }),
    };
  },

  createTest: async (testData: CreateTestData) => {
    return await prisma.test.create({
      data: {
        ...testData,
      },
    });
  },
};

export default testFactory;
