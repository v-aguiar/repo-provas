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
            id: true,
            name: true,
            teacherDisciplines: {
              select: {
                teacher: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
                tests: {
                  select: {
                    id: true,
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

  getByTeachers: async () => {
    const tests = await prisma.teacher.findMany({
      select: {
        id: true,
        name: true,
        teacherDisciplines: {
          select: {
            tests: {
              select: {
                category: {
                  select: {
                    id: true,
                    name: true,
                    tests: {
                      select: {
                        teacherDiscipline: {
                          select: {
                            discipline: {
                              select: {
                                term: {
                                  select: {
                                    id: true,
                                    number: true,
                                    disciplines: {
                                      select: {
                                        teacherDisciplines: {
                                          select: {
                                            tests: {
                                              select: {
                                                id: true,
                                                name: true,
                                                pdfUrl: true,
                                                teacherDiscipline: {
                                                  select: {
                                                    discipline: { select: { name: true } },
                                                  },
                                                },
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    return tests;
  },
};

export default testRepository;
