import { prisma } from "../config/db.js";

import { CreateTestData } from "../services/testService.js";

const testRepository = {
  create: async (createTestData: CreateTestData) => {
    await prisma.test.create({
      data: {
        ...createTestData,
      },
    });
  },

  getByName: (name: string) => {
    return prisma.test.findUnique({ where: { name } });
  },
};

export default testRepository;
