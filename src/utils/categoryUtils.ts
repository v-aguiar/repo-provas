import { prisma } from "../config/db.js";
import categoryRepository from "../repositories/categoryRepository.js";

const categoryUtils = {
  checkCategoryExistence: async (id: number) => {
    const category = await categoryRepository.getById(id);
    if (!category) {
      throw {
        name: "Not Found",
        message: "⚠ Category not found...",
      };
    }
  },
};

export default categoryUtils;
