import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import { prisma } from "../../src/config/db.js";

interface Login {
  email: string;
  password: string;
}

const userFactory = {
  createLogin: (email = "email@teste.com", passwordLength = 10) => {
    const password = faker.internet.password(passwordLength);
    return {
      email,
      password,
      confirmPassword: password,
    };
  },

  createUser: async ({ email, password }: Login) => {
    const user = await prisma.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password, 15),
      },
    });

    return { ...user, password };
  },
};

export default userFactory;
