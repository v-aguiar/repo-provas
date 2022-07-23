import { prisma } from "../config/db.js";

const categoryRepository = {
  getById: async (id: number) => {
    return await prisma.category.findUnique({ where: { id } });
  },
};

export default categoryRepository;
