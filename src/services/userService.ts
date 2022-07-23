import { User } from "@prisma/client";

import { CreateUserSchema } from "../schemas/createUserSchema.js";
import userRepository from "../repositories/userRepository.js";
import userUtils from "../utils/userUtils.js";

const userService = {
  signUp: async ({ email, password }: CreateUserSchema) => {
    await userUtils.checkForUserConflict(email);

    const hashedPassword = await userUtils.hashData(password);
    await userRepository.create({ email, password: hashedPassword });
  },

  signIn: async ({ email, password }: CreateUserSchema) => {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw {
        name: "NotFound",
        message: "⚠ Invalid email or password...",
      };
    }

    const validatePassword = await userUtils.compareHashedData(password, user.password);
    if (!validatePassword) {
      throw {
        name: "Unauthorized",
        message: "⚠ Invalid email or password...",
      };
    }

    const token = userUtils.generateToken(user.id);
    return token;
  },
};

export default userService;
