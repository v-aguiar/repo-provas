import { User } from "@prisma/client";

import userRepository from "../repositories/userRepository.js";
import userUtils from "../utils/userUtils.js";

export type CreateUserData = Omit<User, "id">;

const userService = {
  create: async (createUserData: CreateUserData) => {
    const { email, password } = createUserData;
    await userUtils.checkForUserConflict(email);

    const hashedPassword = await userUtils.hashData(password);
    await userRepository.create({ email, password: hashedPassword });
  },
};

export default userService;
