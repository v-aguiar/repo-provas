import { prisma } from "../config/db.js";
import { CreateUserData } from "../services/userService.js";

const userRepository = {
  create: async (createUserData: CreateUserData) => {
    await prisma.user.create({ data: createUserData });
  },

  findByEmail: async (email: string) => {
    return await prisma.user.findUnique({ where: { email } });
  },
};

export default userRepository;
