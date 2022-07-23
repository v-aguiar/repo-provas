import { prisma } from "../config/db.js";

const teacherDisciplineRepository = {
  getById: async (id: number) => {
    return await prisma.teacherDiscipline.findUnique({ where: { id } });
  },
};

export default teacherDisciplineRepository;
