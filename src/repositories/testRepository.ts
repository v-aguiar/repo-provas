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

  getByName: async (name: string) => {
    return await prisma.test.findUnique({ where: { name } });
  },

  getByDisciplines: async () => {
    return await prisma.term.findMany({
      select: {
        number: true,
        disciplines: {
          select: {
            name: true,
            teacherDisciplines: {
              select: {
                teacher: {
                  select: {
                    name: true,
                  },
                },
                tests: {
                  select: {
                    name: true,
                    pdfUrl: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  },
};

export default testRepository;
