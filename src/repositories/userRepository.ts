import { User } from "@prisma/client";
import { prisma } from "../config/db.js";

export type CreateUserData = Omit<User, "id">;

const userRepository = {
  create: async (createUserData: CreateUserData) => {
    await prisma.user.create({ data: createUserData });
  },

  findByEmail: async (email: string) => {
    return await prisma.user.findUnique({ where: { email } });
  },
};

export default userRepository;
